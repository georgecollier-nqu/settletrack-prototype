import { NextRequest, NextResponse } from 'next/server';
import { removeAuthCookie, getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (user) {
      // Create audit log
      await prisma.auditLog.create({
        data: {
          action: 'USER_LOGOUT',
          entityType: 'User',
          entityId: user.userId,
          userId: user.userId,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          userAgent: request.headers.get('user-agent'),
        },
      });
    }
    
    // Remove auth cookie
    await removeAuthCookie();
    
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}