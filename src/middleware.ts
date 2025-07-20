import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { Role } from '@prisma/client';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/api/auth/login', '/api/auth/logout'];
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Get auth token from cookie
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  const user = verifyToken(token);
  if (!user) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Check role-based access
  const adminRoutes = ['/admin'];
  const qcRoutes = ['/admin/cases', '/admin/qc'];
  const supervisorRoutes = ['/admin/users', '/admin/organizations'];
  
  if (pathname.startsWith('/admin')) {
    // QC routes - accessible by REVIEWER and SUPERVISOR
    if (qcRoutes.some(route => pathname.startsWith(route))) {
      if (user.role !== Role.REVIEWER && user.role !== Role.SUPERVISOR) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
    
    // Supervisor-only routes
    if (supervisorRoutes.some(route => pathname.startsWith(route))) {
      if (user.role !== Role.SUPERVISOR) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
    
    // General admin routes - require at least REVIEWER role
    if (user.role === Role.USER) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  // Add user info to headers for use in server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', user.userId);
  requestHeaders.set('x-user-email', user.email);
  requestHeaders.set('x-user-role', user.role);
  if (user.organizationId) {
    requestHeaders.set('x-user-organization', user.organizationId);
  }
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};