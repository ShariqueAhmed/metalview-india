/**
 * Blog Sitemap
 * Contains blog posts and blog main page
 */

import { MetadataRoute } from 'next';

const BLOG_SLUGS = [
  'understanding-gold-purity-24k-vs-22k',
  'gold-price-trends-2025',
  'best-time-to-buy-gold',
  'gold-investment-vs-jewelry',
  'how-to-calculate-gold-price',
  'gold-hallmark-explained',
  'gold-investment-strategies',
  'factors-affecting-gold-prices',
];

// Blog post dates (from blog posts data)
const BLOG_POST_DATES: Record<string, string> = {
  'understanding-gold-purity-24k-vs-22k': '2025-01-15',
  'gold-price-trends-2025': '2025-01-12',
  'best-time-to-buy-gold': '2025-01-08',
  'gold-investment-vs-jewelry': '2025-01-06',
  'how-to-calculate-gold-price': '2025-01-10',
  'gold-hallmark-explained': '2025-01-14',
  'gold-investment-strategies': '2025-01-03',
  'factors-affecting-gold-prices': '2025-01-05',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Blog main page (use latest blog post date)
  const latestBlogDate = Object.values(BLOG_POST_DATES)
    .map((date) => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime())[0] || now;
  
  sitemapEntries.push({
    url: `${baseUrl}/blog`,
    lastModified: latestBlogDate,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  });

  // Individual blog posts (use actual publication dates)
  for (const slug of BLOG_SLUGS) {
    const postDate = BLOG_POST_DATES[slug];
    if (postDate) {
      sitemapEntries.push({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(postDate),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}
