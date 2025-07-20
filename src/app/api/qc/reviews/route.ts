import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

// GET /api/qc/reviews - List QC reviews
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const reviewerId = searchParams.get('reviewerId');
    const myReviews = searchParams.get('myReviews') === 'true';

    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (myReviews) {
      where.reviewerId = currentUser.userId;
    } else if (reviewerId) {
      where.reviewerId = reviewerId;
    }

    const reviews = await prisma.qCReview.findMany({
      where,
      include: {
        case: {
          select: {
            id: true,
            caseId: true,
            patientName: true,
            surgeryDate: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        supervisor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        modelOutput1: {
          select: {
            modelName: true,
            modelVersion: true,
          },
        },
        modelOutput2: {
          select: {
            modelName: true,
            modelVersion: true,
          },
        },
        _count: {
          select: {
            changeLogs: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching QC reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST /api/qc/reviews - Create a new QC review
const createReviewSchema = z.object({
  caseId: z.string(),
  modelOutput1Id: z.string(),
  modelOutput2Id: z.string().optional(),
  reviewerId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role === 'USER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { caseId, modelOutput1Id, modelOutput2Id, reviewerId } = createReviewSchema.parse(body);

    // Verify the case exists
    const caseExists = await prisma.case.findUnique({
      where: { id: caseId },
    });

    if (!caseExists) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // Create the QC review
    const review = await prisma.qCReview.create({
      data: {
        caseId,
        modelOutput1Id,
        modelOutput2Id,
        reviewerId,
        status: 'PENDING',
      },
      include: {
        case: true,
        reviewer: true,
        modelOutput1: true,
        modelOutput2: true,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'QC_REVIEW_CREATED',
        entityType: 'QCReview',
        entityId: review.id,
        userId: currentUser.userId,
        details: {
          caseId,
          reviewerId,
        },
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating QC review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}