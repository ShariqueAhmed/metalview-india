/**
 * Enhanced Sitemap Generation
 * Includes all metals, cities, blog posts, and guides
 * Uses real lastModified dates from API data
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
  'how-to-calculate-gold-price',
  'gold-hallmark-explained',
  'gold-investment-strategies',
  'factors-affecting-gold-prices',
];

const GUIDE_PAGES = [
  'gold-price-guide',
  'silver-investment-guide',
  'metal-price-factors',
  'best-time-to-buy-gold',
  'gold-vs-silver-investment',
  '24k-vs-22k-vs-18k-gold',
  'best-cities-to-buy-gold',
  'gold-price-trends-2025',
  'copper-price-guide',
  'platinum-investment-guide',
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
  
  // Fallback to current date
  return new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Homepage - Highest priority (use current date as it updates frequently)
  sitemapEntries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'hourly' as const,
    priority: 1.0,
  });

  // Dashboard page
  sitemapEntries.push({
    url: `${baseUrl}/dashboard`,
    lastModified: now,
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  });

  // Fetch last updated dates for cities (batch fetch for efficiency)
  const cityDates = new Map<string, Date>();
  const cityPromises = TOP_CITIES.map(async (city) => {
    const date = await getLastUpdatedDate(city);
    cityDates.set(city, date);
  });
  
  // Wait for all city dates to be fetched (with timeout)
  await Promise.allSettled(cityPromises);

  // City overview pages (all metals for a city)
  for (const city of TOP_CITIES) {
    const lastModified = cityDates.get(city) || now;
    sitemapEntries.push({
      url: `${baseUrl}/city/${city}`,
      lastModified,
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    });
  }

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

  // Guide pages (use creation date or last update)
  const guideLastModified = new Date('2025-01-15'); // Update when guides are modified
  for (const guide of GUIDE_PAGES) {
    sitemapEntries.push({
      url: `${baseUrl}/${guide}`,
      lastModified: guideLastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });
  }

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

  // Comparison pages
  sitemapEntries.push({
    url: `${baseUrl}/gold-price-comparison`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.75,
  });

  sitemapEntries.push({
    url: `${baseUrl}/metal-price-trends`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.75,
  });

  return sitemapEntries;
}
