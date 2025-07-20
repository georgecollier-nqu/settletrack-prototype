import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';
import { Role } from '@prisma/client';

// PATCH /api/users/[id] - Update a user (supervisors only)
const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.enum(['REVIEWER', 'USER']).optional(),
  isActive: z.boolean().optional(),
  organizationId: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'SUPERVISOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updateData = updateUserSchema.parse(body);

    // Get the existing user
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent demoting supervisors
    if (existingUser.role === 'SUPERVISOR' && updateData.role) {
      return NextResponse.json(
        { error: 'Cannot change role of supervisor users' },
        { status: 400 }
      );
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      include: {
        organization: true,
        _count: {
          select: {
            reviewsAssigned: true,
            supervisorReviews: true,
          },
        },
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'USER_UPDATED',
        entityType: 'User',
        entityId: params.id,
        userId: currentUser.userId,
        details: {
          changes: updateData,
          previousRole: existingUser.role,
          newRole: updateData.role || existingUser.role,
        },
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Deactivate a user (supervisors only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'SUPERVISOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent deactivating supervisors
    if (user.role === 'SUPERVISOR') {
      return NextResponse.json(
        { error: 'Cannot deactivate supervisor users' },
        { status: 400 }
      );
    }

    // Deactivate the user (soft delete)
    await prisma.user.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'USER_DEACTIVATED',
        entityType: 'User',
        entityId: params.id,
        userId: currentUser.userId,
        details: {
          userEmail: user.email,
          userName: user.name,
        },
      },
    });

    return NextResponse.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating user:', error);
    return NextResponse.json(
      { error: 'Failed to deactivate user' },
      { status: 500 }
    );
  }
}