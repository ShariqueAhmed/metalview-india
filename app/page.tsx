/**
 * Homepage – Hub for metal price pages
 * Each metal has its own page: /gold, /silver, /copper, /platinum, /palladium
 */

import type { Metadata } from 'next';
import HomeClient from './page-client';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

export const metadata: Metadata = {
  title: 'Gold & Silver Price Today in India - Live Rates | MetalView',
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
    url: baseUrl,
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
  alternates: { canonical: baseUrl },
};

export default function Home() {
  return <HomeClient />;
}
