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

/** All blog posts with publication date (from blog/page.tsx) */
const BLOG_POSTS: { slug: string; date: string }[] = [
  { slug: 'understanding-gold-purity-24k-vs-22k', date: '2025-01-20' },
  { slug: 'gold-price-trends-2025', date: '2025-01-18' },
  { slug: 'best-time-to-buy-gold', date: '2025-01-15' },
  { slug: 'gold-investment-vs-jewelry', date: '2025-01-12' },
  { slug: 'how-to-calculate-gold-price', date: '2025-01-10' },
  { slug: 'gold-hallmark-explained', date: '2025-01-08' },
  { slug: 'factors-affecting-gold-prices', date: '2025-01-05' },
  { slug: 'gold-investment-strategies', date: '2025-01-03' },
  { slug: 'gold-price-in-delhi', date: '2025-01-19' },
  { slug: 'gold-price-in-mumbai', date: '2025-01-17' },
  { slug: 'gold-price-in-bangalore', date: '2025-01-16' },
  { slug: 'gold-price-in-kolkata', date: '2025-01-14' },
  { slug: 'gold-price-in-chennai', date: '2025-01-13' },
  { slug: 'gold-price-in-hyderabad', date: '2025-01-11' },
  { slug: 'gold-price-in-pune', date: '2025-01-09' },
  { slug: 'gold-price-in-ahmedabad', date: '2025-01-07' },
  { slug: 'gold-price-in-jaipur', date: '2025-01-06' },
  { slug: 'gold-price-in-surat', date: '2025-01-04' },
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
  const latestBlogDate = BLOG_POSTS.length
    ? new Date(BLOG_POSTS.map((p) => p.date).sort().reverse()[0])
    : now;
  entries.push({
    url: `${BASE_URL}/blog`,
    lastModified: latestBlogDate,
    changeFrequency: 'daily',
    priority: 0.85,
  });

  for (const { slug, date } of BLOG_POSTS) {
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
