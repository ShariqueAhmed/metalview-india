/**
 * Next.js Middleware
 * Handles redirects and ensures ads.txt is accessible on both www and non-www
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Ensure ads.txt is accessible on both www and non-www
  // The route handler will handle serving the content
  if (url.pathname === '/ads.txt') {
    // Allow ads.txt to be served on both www and non-www
    return NextResponse.next();
  }

  // Optional: Add www to non-www redirect (or vice versa)
  // Uncomment and modify based on your preference:
  
  // Redirect www to non-www (recommended for SEO)
  // const hostname = request.headers.get('host') || '';
  // if (hostname.startsWith('www.')) {
  //   url.hostname = hostname.replace('www.', '');
  //   return NextResponse.redirect(url, 301);
  // }

  // Or redirect non-www to www
  // const hostname = request.headers.get('host') || '';
  // if (!hostname.startsWith('www.') && hostname.includes('metalview.in')) {
  //   url.hostname = `www.${hostname}`;
  //   return NextResponse.redirect(url, 301);
  // }

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
