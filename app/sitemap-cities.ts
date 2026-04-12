/**
 * Cities Sitemap
 * Contains city overview pages and static pages
 */

import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/utils/siteUrl';

const TOP_CITIES = [
  'mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai',
  'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'surat',
  'lucknow', 'kanpur', 'nagpur', 'indore', 'thane',
  'bhopal', 'visakhapatnam', 'patna', 'vadodara', 'ghaziabad',
  'coimbatore', 'agra', 'madurai', 'nashik', 'meerut',
  'rajkot', 'varanasi', 'srinagar', 'amritsar', 'jodhpur',
];

const GUIDE_PAGES = [
  'gold-price-guide',
  'silver-investment-guide',
  'investment-guide',
  'gold-vs-silver-investment',
  '24k-vs-22k-vs-18k-gold',
  'best-cities-to-buy-gold',
  'gold-price-trends-2025',
];

/**
 * Fetch last updated date for a city from API
 */
async function getLastUpdatedDate(city: string): Promise<Date> {
  try {
    const baseUrl = getSiteUrl();
    
    const response = await fetch(`${baseUrl}/api/metals?city=${encodeURIComponent(city)}`, {
      next: { revalidate: 600 },
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

  // Homepage - Highest priority
  sitemapEntries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'hourly' as const,
    priority: 1.0,
  });

  // Fetch last updated dates for cities
  const cityDates = new Map<string, Date>();
  const cityPromises = TOP_CITIES.map(async (city) => {
    const date = await getLastUpdatedDate(city);
    cityDates.set(city, date);
  });
  
  await Promise.allSettled(cityPromises);

  // City overview pages
  for (const city of TOP_CITIES) {
    const lastModified = cityDates.get(city) || now;
    sitemapEntries.push({
      url: `${baseUrl}/city/${city}`,
      lastModified,
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    });
  }

  // Guide pages
  const guideLastModified = new Date('2025-01-15');
  for (const guide of GUIDE_PAGES) {
    sitemapEntries.push({
      url: `${baseUrl}/${guide}`,
      lastModified: guideLastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });
  }

  return sitemapEntries;
}
