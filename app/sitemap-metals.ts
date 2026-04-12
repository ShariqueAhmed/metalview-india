/**
 * Metals Sitemap
 * Contains all metal-city combination pages
 */

import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/utils/siteUrl';
import { SITEMAP_METALS, SITEMAP_TOP_CITIES } from '@/utils/sitemapConstants';

const METALS = [...SITEMAP_METALS];

/**
 * Fetch last updated date for a city from API
 */
async function getLastUpdatedDate(city: string): Promise<Date> {
  try {
    const baseUrl = getSiteUrl();

    const response = await fetch(`${baseUrl}/api/metals?city=${encodeURIComponent(city)}`, {
      next: { revalidate: 600 }, // Cache for 10 minutes
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.updated_at) {
        return new Date(data.updated_at);
      }
    }
  } catch (error) {
    console.error(`Error fetching last updated date for ${city}:`, error);
  }

  return new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Fetch last updated dates for cities (batch fetch for efficiency)
  const cityDates = new Map<string, Date>();
  const cityPromises = [...SITEMAP_TOP_CITIES].map(async (city) => {
    const date = await getLastUpdatedDate(city);
    cityDates.set(city, date);
  });

  await Promise.allSettled(cityPromises);

  // Metal-city combinations (new route structure)
  for (const city of SITEMAP_TOP_CITIES) {
    const lastModified = cityDates.get(city) || now;
    for (const metal of METALS) {
      sitemapEntries.push({
        url: `${baseUrl}/${metal}/price-in/${city}`,
        lastModified,
        changeFrequency: 'hourly' as const,
        priority: 0.85,
      });
    }
  }

  return sitemapEntries;
}
