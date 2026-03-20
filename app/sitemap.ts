/**
 * SEO-optimized sitemap for MetalView India
 * Covers: homepage, metal hubs, cities, metal+city, guides, blog, static pages.
 * Uses correct priorities, changeFrequency, and lastmod for best crawl efficiency.
 *
 * Note: Google limits a single sitemap to 50,000 URLs. If this sitemap grows beyond
 * that, split into a sitemap index (e.g. sitemap-index.xml) and multiple sitemaps
 * (sitemap-pages.xml, sitemap-cities.xml, sitemap-blog.xml).
 */

import { MetadataRoute } from 'next';
import { BLOG_SITEMAP_ENTRIES } from '@/utils/blogSitemapData';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

const METALS = ['gold', 'silver', 'copper', 'platinum', 'palladium'] as const;

const TOP_CITIES = [
  'mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai',
  'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'surat',
  'lucknow', 'kanpur', 'nagpur', 'indore', 'thane',
  'bhopal', 'visakhapatnam', 'patna', 'vadodara', 'ghaziabad',
  'coimbatore', 'agra', 'madurai', 'nashik', 'meerut',
  'rajkot', 'varanasi', 'srinagar', 'amritsar', 'jodhpur',
];

/** Guide pages that exist in app (from /guides) */
const GUIDE_PAGES = [
  { path: 'gold-price-guide', priority: 0.85 },
  { path: 'silver-investment-guide', priority: 0.85 },
  { path: 'investment-guide', priority: 0.85 },
  { path: 'gold-vs-silver-investment', priority: 0.85 },
  { path: '24k-vs-22k-vs-18k-gold', priority: 0.85 },
  { path: 'gold-price-trends-2025', priority: 0.85 },
  { path: 'best-cities-to-buy-gold', priority: 0.85 },
];

/** Fetch last updated for a city from API (cached) */
async function getCityLastMod(city: string): Promise<Date> {
  try {
    const origin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : BASE_URL;
    const res = await fetch(`${origin}/api/metals?city=${encodeURIComponent(city)}`, {
      next: { revalidate: 600 },
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.updated_at) return new Date(data.updated_at);
    }
  } catch {
    // ignore
  }
  return new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // —— Tier 1: Homepage & main hubs ——
  entries.push({
    url: BASE_URL,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 1,
  });

  entries.push({
    url: `${BASE_URL}/dashboard`,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 0.9,
  });

  // Metal hub pages (primary SEO targets)
  for (const metal of METALS) {
    entries.push({
      url: `${BASE_URL}/${metal}`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.95,
    });
  }

  // —— Tier 2: Key content ——
  entries.push({
    url: `${BASE_URL}/guides`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  entries.push({
    url: `${BASE_URL}/about`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  });

  entries.push({
    url: `${BASE_URL}/privacy-policy`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  });

  // —— Tier 3: Guide pages ——
  for (const { path, priority } of GUIDE_PAGES) {
    entries.push({
      url: `${BASE_URL}/${path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority,
    });
  }

  // —— Tier 4: Blog index & posts ——
  const blogDatesSorted = [...BLOG_SITEMAP_ENTRIES.map((p) => p.date)].sort().reverse();
  const latestBlogDateStr = blogDatesSorted[0];
  const latestBlogDate =
    latestBlogDateStr !== undefined ? new Date(latestBlogDateStr) : now;
  entries.push({
    url: `${BASE_URL}/blog`,
    lastModified: latestBlogDate,
    changeFrequency: 'daily',
    priority: 0.85,
  });

  for (const { slug, date } of BLOG_SITEMAP_ENTRIES) {
    entries.push({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(date),
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  }

  // —— Tier 5: City & metal–city URLs (with lastmod from API where possible) ——
  const cityDates = await Promise.all(
    TOP_CITIES.map(async (city) => ({ city, date: await getCityLastMod(city) }))
  ).then((list) => new Map(list.map(({ city, date }) => [city, date])));

  for (const city of TOP_CITIES) {
    const lastMod = cityDates.get(city) ?? now;
    entries.push({
      url: `${BASE_URL}/city/${city}`,
      lastModified: lastMod,
      changeFrequency: 'hourly',
      priority: 0.88,
    });
  }

  for (const city of TOP_CITIES) {
    const lastMod = cityDates.get(city) ?? now;
    for (const metal of METALS) {
      entries.push({
        url: `${BASE_URL}/${metal}/price-in/${city}`,
        lastModified: lastMod,
        changeFrequency: 'hourly',
        priority: 0.85,
      });
    }
  }

  // Legacy metal-price-today-in-{city} routes (backward compatibility)
  for (const city of TOP_CITIES) {
    const lastMod = cityDates.get(city) ?? now;
    entries.push({
      url: `${BASE_URL}/gold-price-today-in-${city}`,
      lastModified: lastMod,
      changeFrequency: 'hourly',
      priority: 0.75,
    });
  }

  return entries;
}
