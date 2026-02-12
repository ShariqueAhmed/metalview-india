/**
 * Main Page - Server Component
 * Generates metadata and renders client component
 */

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import HomeClient from './page-client';
import { formatCityName } from '@/utils/conversions';

// Generate metadata for SEO with dynamic support for URL params
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  
  // Get search params from request headers
  let metalParam: string | undefined;
  let cityParam: string | undefined;
  
  try {
    const headersList = await headers();
    const referer = headersList.get('referer') || '';
    const url = new URL(referer || baseUrl);
    metalParam = url.searchParams.get('metal') || undefined;
    cityParam = url.searchParams.get('city') || undefined;
  } catch (error) {
    // If we can't parse URL params, use defaults
    console.error('Error parsing search params:', error);
  }
  
  // Validate and normalize metal param
  const metal = metalParam && ['gold', 'silver', 'copper', 'platinum', 'palladium'].includes(metalParam.toLowerCase())
    ? metalParam.toLowerCase()
    : undefined;
  
  // Normalize city param
  const city = cityParam ? cityParam.toLowerCase() : undefined;
  
  // Generate dynamic metadata if metal or city params are present
  if (metal || city) {
    const metalName = metal ? metal.charAt(0).toUpperCase() + metal.slice(1) : 'Metal';
    const cityName = city ? formatCityName(city) : 'India';
    const title = `${metalName} Price in ${cityName} | MetalView India`;
    const description = `Get live ${metal || 'metal'} prices in ${cityName}, India. Check today's ${metal || 'metal'} rate, historical trends, and market insights. Real-time updates from trusted sources.`;
    const ogUrl = `${baseUrl}${metal || city ? `?${metal ? `metal=${metal}` : ''}${city ? `${metal ? '&' : ''}city=${city}` : ''}` : ''}`;
    
    return {
      title,
      description,
      keywords: [
        `${metal || 'metal'} price in ${cityName.toLowerCase()}`,
        `${metal || 'metal'} price in india`,
        `${metal || 'metal'} rate today`,
        `${metal || 'metal'} price ${cityName.toLowerCase()}`,
        `live ${metal || 'metal'} prices`,
        `${cityName.toLowerCase()} ${metal || 'metal'} rate`,
      ],
      openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: ogUrl,
        title: `${metalName} Price in ${cityName} | MetalView`,
        description: `Get live ${metal || 'metal'} prices in ${cityName}, India. Check today's rates and historical trends.`,
        siteName: 'MetalView',
        images: [
          {
            url: `${baseUrl}/api/og?metal=${metal || 'gold'}&city=${city || 'mumbai'}`,
            width: 1200,
            height: 630,
            alt: `${metalName} prices in ${cityName}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${metalName} Price in ${cityName} | MetalView`,
        description: `Get live ${metal || 'metal'} prices in ${cityName}, India. Check today's rates.`,
        images: [`${baseUrl}/api/og?metal=${metal || 'gold'}&city=${city || 'mumbai'}`],
      },
      alternates: {
        canonical: ogUrl,
      },
    };
  }
  
  // Default metadata for homepage - Optimized for SEO
  return {
    title: 'Gold & Silver Price Today in India - Live Rates 2025 | MetalView',
    description: 'Get live gold and silver prices in India today. Real-time rates for Mumbai, Delhi, Bangalore. Check 24K, 22K gold prices, silver per kg. Updated every 10 minutes.',
    keywords: [
      'metal price in india',
      'gold price in india',
      'silver price in india',
      'copper price in india',
      'platinum price in india',
      'gold rate today',
      'silver rate today',
      'live metal prices',
      'metal price today',
      'gold rate mumbai',
      'gold rate delhi',
      'precious metal prices',
      'industrial metal prices',
    ],
      openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: baseUrl,
        title: 'Gold & Silver Price Today in India - Live Rates 2025 | MetalView',
        description: 'Get live gold and silver prices in India today. Real-time rates for Mumbai, Delhi, Bangalore. Check 24K, 22K gold prices, silver per kg. Updated every 10 minutes.',
      siteName: 'MetalView',
      images: [
        {
          url: `${baseUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: 'MetalView - Live Metal Prices in India',
        },
      ],
    },
      twitter: {
        card: 'summary_large_image',
        title: 'Gold & Silver Price Today in India - Live Rates 2025 | MetalView',
        description: 'Get live gold and silver prices in India today. Real-time rates for Mumbai, Delhi, Bangalore. Check 24K, 22K gold prices, silver per kg. Updated every 10 minutes.',
      images: [`${baseUrl}/api/og`],
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
