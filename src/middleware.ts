import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/overview',
  '/albums',
  '/favorites',
  '/archive',
  '/trash',
  '/private',
  '/share',
  '/profile'
];

const publicRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/welcome'
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const path = request.nextUrl.pathname;

  if (publicRoutes.includes(path) && token) {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  if (protectedRoutes.some(route => path.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...publicRoutes]
};