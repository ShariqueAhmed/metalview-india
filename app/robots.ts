/**
 * Robots.txt for SEO
 * Allows crawlers to render public pages, references sitemaps, and disallows admin/API paths.
 *
 * Important for AdSense: if you ever use `Disallow: /ads`, crawlers treat it as blocking
 * `/ads.txt` (prefix match). Always keep `Allow: /ads.txt` before any `/ads` disallow, or
 * use `Disallow: /ads/` for a folder only. See Google ads.txt troubleshooter.
 */

import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/utils/siteUrl';

const BASE_URL = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  // Do not add public/robots.txt — Next.js forbids both app/robots.ts and public/robots.txt (500 conflict).
  return {
    rules: [
      {
        userAgent: '*',
        // Explicit allow so ads.txt stays crawlable if any rule uses Disallow: /ads (prefix blocks /ads.txt)
        allow: ['/ads.txt', '/'],
        disallow: ['/api/', '/private/', '/dashboard'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/ads.txt', '/'],
        disallow: ['/api/', '/dashboard'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/ads.txt', '/'],
        disallow: ['/api/', '/dashboard'],
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
