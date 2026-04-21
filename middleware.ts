/**
 * Next.js Middleware
 * Handles redirects and ensures ads.txt is accessible on both www and non-www
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Ensure ads.txt is accessible on both www and non-www
  // The route handler will handle serving the content
  if (url.pathname === '/ads.txt') {
    // Allow ads.txt to be served on both www and non-www
    return NextResponse.next();
  }

  // Keep one crawlable version of the site. The polished production build is
  // canonical at metalview.in; redirect www pages to avoid duplicate review paths.
  if (hostname === 'www.metalview.in') {
    url.hostname = 'metalview.in';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
