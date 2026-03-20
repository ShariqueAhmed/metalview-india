/**
 * Blog-only sitemap at /sitemap-blog.xml
 * Uses the same slug/date list as the main sitemap (utils/blogSitemapData).
 */

import { MetadataRoute } from 'next';
import { BLOG_SITEMAP_ENTRIES } from '@/utils/blogSitemapData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  const now = new Date();

  const blogDatesSorted = [...BLOG_SITEMAP_ENTRIES.map((p) => p.date)].sort().reverse();
  const latestStr = blogDatesSorted[0];
  const latestBlogDate = latestStr !== undefined ? new Date(latestStr) : now;

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    ...BLOG_SITEMAP_ENTRIES.map(({ slug, date }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(date),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];

  return sitemapEntries;
}
