/**
 * Homepage – Hub for metal price pages
 * Each metal has its own page: /gold, /silver, /copper, /platinum, /palladium
 */

import type { Metadata } from 'next';
import HomeClient from './page-client';
import { getSiteUrl } from '@/utils/siteUrl';
import type { MetalsApiResponse } from '@/app/api/metals/route';

export interface HomeMetalPrices {
  gold: number | null;
  silver: number | null;
  copper: number | null;
  platinum: number | null;
  palladium: number | null;
  updatedAt: string | null;
}

  const baseUrl = getSiteUrl();
  
export const metadata: Metadata = {
  title: 'Gold, Silver, Copper, Platinum & Palladium Price Today in India | MetalView',
  description: 'Get live gold, silver, copper, platinum, and palladium prices in India. Real-time rates for Mumbai, Delhi, Bangalore and more. Check each metal for today\'s price.',
    keywords: [
      'metal price in india',
      'gold price in india',
      'silver price in india',
      'copper price in india',
      'platinum price in india',
      'gold rate today',
      'silver rate today',
      'live metal prices',
    ],
      openGraph: {
        type: 'website',
        locale: 'en_IN',
    url: `${baseUrl}/`,
    title: 'Gold & Silver Price Today in India | MetalView',
    description: 'Live metal prices in India – Gold, Silver, Copper, Platinum, Palladium.',
      siteName: 'MetalView',
    images: [{ url: `${baseUrl}/api/og`, width: 1200, height: 630, alt: 'MetalView - Live Metal Prices in India' }],
    },
      twitter: {
        card: 'summary_large_image',
    title: 'Gold & Silver Price Today in India | MetalView',
    description: 'Live metal prices in India.',
      images: [`${baseUrl}/api/og`],
    },
  alternates: { canonical: '/' },
  };

async function getHomeMetalPrices(): Promise<HomeMetalPrices | null> {
  try {
    const response = await fetch(`${baseUrl}/api/metals?city=mumbai`, {
      next: { revalidate: 120 },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as MetalsApiResponse;
    return {
      gold: data.gold_10g ?? null,
      silver: data.silver_1kg ?? null,
      copper: data.copper_1kg ?? data.copper ?? null,
      platinum: data.platinum_10g ?? data.platinum ?? null,
      palladium: data.palladium_10g ?? data.palladium ?? null,
      updatedAt: data.updated_at ?? null,
    };
  } catch {
    return null;
  }
}

export default async function Home() {
  const prices = await getHomeMetalPrices();
  return <HomeClient prices={prices} />;
}
