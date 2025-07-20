import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

// POST /api/qc/reviews/[id]/approve - Approve a QC review
const approveReviewSchema = z.object({
  notes: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { notes } = approveReviewSchema.parse(body);

    // Get the review
    const review = await prisma.qCReview.findUnique({
      where: { id: params.id },
      include: {
        case: true,
        reviewer: true,
      },
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Determine the new status based on user role
    let newStatus: string;
    let updateData: any = {};

    if (currentUser.userId === review.reviewerId) {
      // Reviewer approval
      if (review.status !== 'IN_REVIEW' && review.status !== 'CHANGES_REQUESTED') {
        return NextResponse.json(
          { error: 'Review must be in progress to approve' },
          { status: 400 }
        );
      }
      newStatus = 'REVIEWER_APPROVED';
      updateData = {
        status: newStatus,
        reviewerNotes: notes,
        reviewCompletedAt: new Date(),
      };
    } else if (currentUser.role === 'SUPERVISOR') {
      // Supervisor approval
      if (review.status !== 'REVIEWER_APPROVED' && review.status !== 'IN_REVIEW') {
        return NextResponse.json(
          { error: 'Invalid review status for supervisor approval' },
          { status: 400 }
        );
      }
      newStatus = 'SUPERVISOR_APPROVED';
      updateData = {
        status: newStatus,
        supervisorId: currentUser.userId,
        supervisorNotes: notes,
        approvedAt: new Date(),
      };

      // If supervisor approved, also mark as completed and update case status
      if (newStatus === 'SUPERVISOR_APPROVED') {
        // Update case status to approved
        await prisma.case.update({
          where: { id: review.caseId },
          data: { status: 'SUPERVISOR_APPROVED' },
        });

        // Save final results
        if (review.reviewerEdits) {
          // Here you would save the final approved data
          // This could involve updating the case fields or creating a final output record
        }
      }
    } else {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Update the review
    const updatedReview = await prisma.qCReview.update({
      where: { id: params.id },
      data: updateData,
      include: {
        case: true,
        reviewer: true,
        supervisor: true,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: `QC_REVIEW_${newStatus}`,
        entityType: 'QCReview',
        entityId: params.id,
        userId: currentUser.userId,
        details: {
          previousStatus: review.status,
          newStatus,
          notes,
        },
      },
    });

    return NextResponse.json({
      message: 'Review approved successfully',
      review: updatedReview,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error approving review:', error);
    return NextResponse.json(
      { error: 'Failed to approve review' },
      { status: 500 }
    );
  }
}