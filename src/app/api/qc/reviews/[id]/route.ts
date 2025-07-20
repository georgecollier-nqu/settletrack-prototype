import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

// GET /api/qc/reviews/[id] - Get a specific QC review
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const review = await prisma.qCReview.findUnique({
      where: { id: params.id },
      include: {
        case: true,
        reviewer: true,
        supervisor: true,
        modelOutput1: true,
        modelOutput2: true,
        changeLogs: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Check if user has access to this review
    const hasAccess = 
      currentUser.role === 'SUPERVISOR' ||
      review.reviewerId === currentUser.userId;
    
    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error fetching QC review:', error);
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

// PATCH /api/qc/reviews/[id] - Update a QC review
const updateReviewSchema = z.object({
  status: z.enum(['PENDING', 'IN_REVIEW', 'CHANGES_REQUESTED', 'REVIEWER_APPROVED', 'SUPERVISOR_APPROVED', 'REJECTED', 'COMPLETED']).optional(),
  reviewerEdits: z.any().optional(),
  reviewerNotes: z.string().optional(),
  supervisorNotes: z.string().optional(),
  reviewStartedAt: z.string().datetime().optional(),
  reviewCompletedAt: z.string().datetime().optional(),
  approvedAt: z.string().datetime().optional(),
  rejectedAt: z.string().datetime().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role === 'USER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updateData = updateReviewSchema.parse(body);

    // Get the existing review
    const existingReview = await prisma.qCReview.findUnique({
      where: { id: params.id },
      include: { reviewer: true },
    });

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Check permissions
    const isReviewer = existingReview.reviewerId === currentUser.userId;
    const isSupervisor = currentUser.role === 'SUPERVISOR';

    if (!isReviewer && !isSupervisor) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Validate status transitions
    if (updateData.status) {
      const validTransitions = getValidStatusTransitions(existingReview.status, currentUser.role);
      if (!validTransitions.includes(updateData.status)) {
        return NextResponse.json(
          { error: 'Invalid status transition' },
          { status: 400 }
        );
      }
    }

    // Update the review
    const updatedReview = await prisma.qCReview.update({
      where: { id: params.id },
      data: updateData,
      include: {
        case: true,
        reviewer: true,
        supervisor: true,
        modelOutput1: true,
        modelOutput2: true,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'QC_REVIEW_UPDATED',
        entityType: 'QCReview',
        entityId: params.id,
        userId: currentUser.userId,
        details: {
          changes: updateData,
          previousStatus: existingReview.status,
          newStatus: updateData.status || existingReview.status,
        },
      },
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error updating QC review:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// Helper function to determine valid status transitions
function getValidStatusTransitions(currentStatus: string, userRole: string): string[] {
  const transitions: Record<string, Record<string, string[]>> = {
    PENDING: {
      REVIEWER: ['IN_REVIEW'],
      SUPERVISOR: ['IN_REVIEW', 'REJECTED'],
    },
    IN_REVIEW: {
      REVIEWER: ['REVIEWER_APPROVED', 'CHANGES_REQUESTED'],
      SUPERVISOR: ['SUPERVISOR_APPROVED', 'CHANGES_REQUESTED', 'REJECTED'],
    },
    CHANGES_REQUESTED: {
      REVIEWER: ['IN_REVIEW', 'REVIEWER_APPROVED'],
      SUPERVISOR: ['SUPERVISOR_APPROVED', 'REJECTED'],
    },
    REVIEWER_APPROVED: {
      REVIEWER: [],
      SUPERVISOR: ['SUPERVISOR_APPROVED', 'CHANGES_REQUESTED', 'REJECTED'],
    },
    SUPERVISOR_APPROVED: {
      REVIEWER: [],
      SUPERVISOR: ['COMPLETED'],
    },
    REJECTED: {
      REVIEWER: [],
      SUPERVISOR: ['IN_REVIEW'],
    },
    COMPLETED: {
      REVIEWER: [],
      SUPERVISOR: [],
    },
  };

  return transitions[currentStatus]?.[userRole] || [];
}