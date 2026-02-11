/**
 * Enhanced Sitemap Generation
 * Includes all metals, cities, blog posts, and guides
 * 
 * This is an example of an enhanced sitemap.
 * Replace the current sitemap.ts with this implementation.
 */

import { MetadataRoute } from 'next';

const TOP_CITIES = [
  'mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai',
  'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'surat',
  'lucknow', 'kanpur', 'nagpur', 'indore', 'thane',
  'bhopal', 'visakhapatnam', 'patna', 'vadodara', 'ghaziabad',
  'coimbatore', 'agra', 'madurai', 'nashik', 'meerut',
  'rajkot', 'varanasi', 'srinagar', 'amritsar', 'jodhpur',
];

const METALS = ['gold', 'silver', 'copper', 'platinum', 'palladium'];

const BLOG_SLUGS = [
  'understanding-gold-purity-24k-vs-22k',
  'gold-price-trends-2025',
  'best-time-to-buy-gold',
  'gold-investment-vs-jewelry',
];

const GUIDE_PAGES = [
  'gold-price-guide',
  'silver-investment-guide',
  'metal-price-factors',
  'best-time-to-buy-gold',
  'gold-vs-silver-investment',
  'copper-price-guide',
  'platinum-investment-guide',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Homepage - Highest priority
  sitemapEntries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 1.0,
  });

  // Dashboard page
  sitemapEntries.push({
    url: `${baseUrl}/dashboard`,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 0.9,
  });

  // City overview pages (all metals for a city)
  TOP_CITIES.forEach((city) => {
    sitemapEntries.push({
      url: `${baseUrl}/city/${city}`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.9,
    });
  });

  // Metal-city combinations (new route structure)
  TOP_CITIES.forEach((city) => {
    METALS.forEach((metal) => {
      sitemapEntries.push({
        url: `${baseUrl}/${metal}/price-in/${city}`,
        lastModified: now,
        changeFrequency: 'hourly',
        priority: 0.85,
      });
    });
  });

  // Legacy metal-city routes (for backward compatibility)
  TOP_CITIES.forEach((city) => {
    METALS.forEach((metal) => {
      sitemapEntries.push({
        url: `${baseUrl}/${metal}-price-today-in-${city}`,
        lastModified: now,
        changeFrequency: 'hourly',
        priority: 0.8,
      });
    });
  });

  // Guide pages
  GUIDE_PAGES.forEach((guide) => {
    sitemapEntries.push({
      url: `${baseUrl}/${guide}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Blog main page
  sitemapEntries.push({
    url: `${baseUrl}/blog`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  });

  // Individual blog posts
  BLOG_SLUGS.forEach((slug) => {
    sitemapEntries.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Comparison pages
  sitemapEntries.push({
    url: `${baseUrl}/gold-price-comparison`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.75,
  });

  sitemapEntries.push({
    url: `${baseUrl}/metal-price-trends`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.75,
  });

  return sitemapEntries;
}
