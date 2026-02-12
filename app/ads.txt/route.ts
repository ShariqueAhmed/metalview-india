/**
 * ads.txt Route Handler
 * Ensures ads.txt is accessible on both www and non-www domains
 * This is critical for Google AdSense verification
 */

import { NextResponse } from 'next/server';

export async function GET() {
  // Google AdSense ads.txt content
  const adsTxtContent = `google.com, pub-7313067850150544, DIRECT, f08c47fec0942fa0
`;

  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
