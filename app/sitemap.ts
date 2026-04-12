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
import { getSiteUrl } from '@/utils/siteUrl';
import { SITEMAP_GUIDE_SLUGS, SITEMAP_METALS, SITEMAP_TOP_CITIES } from '@/utils/sitemapConstants';

const BASE_URL = getSiteUrl();

const METALS = [...SITEMAP_METALS];

const GUIDE_PAGES = SITEMAP_GUIDE_SLUGS.map((path) => ({ path, priority: 0.85 as const }));

/** Fetch last updated for a city from API (cached). */
async function getCityLastMod(city: string): Promise<Date> {
  try {
    const res = await fetch(`${BASE_URL}/api/metals?city=${encodeURIComponent(city)}`, {
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

  entries.push({
    url: `${BASE_URL}/contact`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
  });

  entries.push({
    url: `${BASE_URL}/terms-of-service`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
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
  const TOP_CITIES = [...SITEMAP_TOP_CITIES];
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

  return entries;
}
