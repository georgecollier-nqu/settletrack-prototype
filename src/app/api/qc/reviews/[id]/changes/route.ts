import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

// POST /api/qc/reviews/[id]/changes - Add a change log entry
const createChangeLogSchema = z.object({
  fieldName: z.string(),
  previousValue: z.string().nullable(),
  newValue: z.string().nullable(),
  annotation: z.string(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role === 'USER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { fieldName, previousValue, newValue, annotation } = createChangeLogSchema.parse(body);

    // Verify the review exists and user has access
    const review = await prisma.qCReview.findUnique({
      where: { id: params.id },
      include: { case: true },
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const hasAccess = 
      currentUser.role === 'SUPERVISOR' ||
      review.reviewerId === currentUser.userId;
    
    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Create the change log entry
    const changeLog = await prisma.changeLog.create({
      data: {
        userId: currentUser.userId,
        caseId: review.caseId,
        qcReviewId: params.id,
        fieldName,
        previousValue,
        newValue,
        annotation,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'CHANGE_LOG_CREATED',
        entityType: 'ChangeLog',
        entityId: changeLog.id,
        userId: currentUser.userId,
        details: {
          reviewId: params.id,
          fieldName,
          annotation,
        },
      },
    });

    return NextResponse.json(changeLog);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating change log:', error);
    return NextResponse.json(
      { error: 'Failed to create change log' },
      { status: 500 }
    );
  }
}

// GET /api/qc/reviews/[id]/changes - Get change logs for a review
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the review exists
    const review = await prisma.qCReview.findUnique({
      where: { id: params.id },
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const hasAccess = 
      currentUser.role === 'SUPERVISOR' ||
      review.reviewerId === currentUser.userId;
    
    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get change logs
    const changeLogs = await prisma.changeLog.findMany({
      where: { qcReviewId: params.id },
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
    });

    return NextResponse.json(changeLogs);
  } catch (error) {
    console.error('Error fetching change logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch change logs' },
      { status: 500 }
    );
  }
}