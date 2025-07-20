import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, hashPassword } from '@/lib/auth';
import { z } from 'zod';
import { Role } from '@prisma/client';

// GET /api/users - List users (supervisors only)
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'SUPERVISOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role') as Role | null;
    const organizationId = searchParams.get('organizationId');

    const where: any = {};
    
    if (role) {
      where.role = role;
    }
    
    if (organizationId) {
      where.organizationId = organizationId;
    }

    const users = await prisma.user.findMany({
      where,
      include: {
        organization: true,
        _count: {
          select: {
            reviewsAssigned: true,
            supervisorReviews: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Remove passwords from response
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    return NextResponse.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user (supervisors only)
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['REVIEWER', 'USER']), // Supervisors can't create other supervisors
  organizationId: z.string(),
  temporaryPassword: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'SUPERVISOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, role, organizationId, temporaryPassword } = createUserSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash the temporary password
    const hashedPassword = await hashPassword(temporaryPassword);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role,
        password: hashedPassword,
        organizationId,
      },
      include: {
        organization: true,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'USER_CREATED',
        entityType: 'User',
        entityId: user.id,
        userId: currentUser.userId,
        details: {
          email,
          name,
          role,
          organizationId,
        },
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    // In a real app, send welcome email with temporary password here

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}