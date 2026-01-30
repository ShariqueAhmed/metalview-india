import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://metalview.in';

  const cities = [
    'delhi', 'mumbai', 'bangalore', 'kolkata', 'chennai', 'hyderabad', 
    'pune', 'ahmedabad', 'jaipur', 'surat', 'lucknow', 'kanpur'
  ];

  const blogPosts = [
    'understanding-gold-purity-24k-vs-22k',
    'gold-price-trends-2025',
    'best-time-to-buy-gold',
    'gold-investment-vs-jewelry',
    'how-to-calculate-gold-price',
    'gold-hallmark-explained',
    'factors-affecting-gold-prices',
    'gold-investment-strategies',
    'gold-price-in-delhi',
    'gold-price-in-mumbai',
    'gold-price-in-bangalore',
    'gold-price-in-kolkata',
    'gold-price-in-chennai',
    'gold-price-in-hyderabad',
    'gold-price-in-pune',
    'gold-price-in-ahmedabad',
    'gold-price-in-jaipur',
    'gold-price-in-surat',
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...cities.map(city => ({
      url: `${baseUrl}/city/${city}`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.7,
    })),
    ...blogPosts.map(slug => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
