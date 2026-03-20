/**
 * Robots.txt for SEO
 * Allows all crawlers, references sitemap, and optionally disallows admin/API paths.
 *
 * Important for AdSense: if you ever use `Disallow: /ads`, crawlers treat it as blocking
 * `/ads.txt` (prefix match). Always keep `Allow: /ads.txt` before any `/ads` disallow, or
 * use `Disallow: /ads/` for a folder only. See Google ads.txt troubleshooter.
 */

import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

export default function robots(): MetadataRoute.Robots {
  // Do not add public/robots.txt — Next.js forbids both app/robots.ts and public/robots.txt (500 conflict).
  return {
    rules: [
      {
        userAgent: '*',
        // Explicit allow so ads.txt stays crawlable if any rule uses Disallow: /ads (prefix blocks /ads.txt)
        allow: ['/ads.txt', '/'],
        disallow: ['/api/', '/_next/', '/private/', '/dashboard'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/ads.txt', '/'],
        disallow: ['/api/', '/_next/', '/dashboard'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/ads.txt', '/'],
        disallow: ['/api/', '/_next/', '/dashboard'],
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap-metals.xml`,
      `${BASE_URL}/sitemap-cities.xml`,
      `${BASE_URL}/sitemap-blog.xml`,
    ],
    host: BASE_URL,
  };
}
