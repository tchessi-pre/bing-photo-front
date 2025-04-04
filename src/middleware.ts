import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = [
  '/overview',
  '/albums',
  '/favorites',
  '/archive',
  '/trash',
  '/private',
  '/share'
];

const publicRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/welcome'
];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const zeutlandToken = request.cookies.get('zeutland-token')?.value;
  const session = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  const isAuthenticated = !!token || !!zeutlandToken || !!session;

  if (publicRoutes.includes(path) && isAuthenticated) {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  if (protectedRoutes.some(route => path.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...publicRoutes]
};
