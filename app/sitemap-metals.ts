/**
 * Metals Sitemap
 * Contains all metal-city combination pages
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

/**
 * Fetch last updated date for a city from API
 */
async function getLastUpdatedDate(city: string): Promise<Date> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Fetch last updated dates for cities (batch fetch for efficiency)
  const cityDates = new Map<string, Date>();
  const cityPromises = TOP_CITIES.map(async (city) => {
    const date = await getLastUpdatedDate(city);
    cityDates.set(city, date);
  });
  
  await Promise.allSettled(cityPromises);

  // Metal-city combinations (new route structure)
  for (const city of TOP_CITIES) {
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

  // Legacy metal-city routes (for backward compatibility)
  for (const city of TOP_CITIES) {
    const lastModified = cityDates.get(city) || now;
    for (const metal of METALS) {
      sitemapEntries.push({
        url: `${baseUrl}/${metal}-price-today-in-${city}`,
        lastModified,
        changeFrequency: 'hourly' as const,
        priority: 0.8,
      });
    }
  }

  return sitemapEntries;
}
