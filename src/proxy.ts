import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // The custom cookie prefix defined in betterAuth config
  const sessionToken = request.cookies.get('aura.session_token') || request.cookies.get('__Secure-aura.session_token');
  
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isProtectedRoute = pathname.startsWith('/product') || pathname.startsWith('/become-vendor') || pathname.startsWith('/dashboard');

  // If trying to access login/register while already logged in, redirect to home
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // If trying to access protected routes while NOT logged in, redirect to login
  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/product/:path*',
    '/become-vendor/:path*',
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
};
