/**
 * Dedicated page per metal: /gold, /silver, /copper, /platinum, /palladium
 * Renders full price view for that metal with city selector (no tabs).
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MetalPageClient from './MetalPageClient';
import { getSiteUrl } from '@/utils/siteUrl';
import type { MetalsApiResponse } from '@/app/api/metals/route';
import { isSupportedMetal } from '@/utils/routeConstants';

interface PageProps {
  params: Promise<{ metal: string }>;
  searchParams: Promise<{ city?: string }>;
}

async function getInitialMetalData(city: string): Promise<MetalsApiResponse | null> {
  try {
    const response = await fetch(`${getSiteUrl()}/api/metals?city=${encodeURIComponent(city)}`, {
      next: { revalidate: 600 },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as MetalsApiResponse;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { metal } = await params;
  if (!isSupportedMetal(metal)) return { title: 'Metal | MetalView' };
  const name = metal.charAt(0).toUpperCase() + metal.slice(1);
  const baseUrl = getSiteUrl();
  return {
    title: `${name} Price Today in India - Live Rates | MetalView`,
    description: `Get live ${name} prices in India today. Check ${name} rate per gram, 10g or kg. Real-time updates for Mumbai, Delhi, Bangalore and more.`,
    keywords: [
      `${name.toLowerCase()} price in india`,
      `${name.toLowerCase()} rate today`,
      `live ${name.toLowerCase()} price`,
      `${name.toLowerCase()} price per gram`,
      `metal price india`,
    ],
    openGraph: {
      title: `${name} Price Today in India | MetalView`,
      description: `Live ${name} prices in India. Real-time rates and historical trends.`,
      url: `${baseUrl}/${metal}`,
      siteName: 'MetalView',
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: `${baseUrl}/api/og?metal=${metal}`,
          width: 1200,
          height: 630,
          alt: `${name} Price in India - MetalView`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} Price Today in India | MetalView`,
      description: `Live ${name} prices in India. Real-time rates and historical trends.`,
    },
    alternates: { canonical: `/${metal}` },
  };
}

export default async function MetalPage({ params, searchParams }: PageProps) {
  const { metal } = await params;
  const { city: cityQuery } = await searchParams;

  if (!metal || !isSupportedMetal(metal)) {
    notFound();
  }

  const normalizedCity =
    typeof cityQuery === 'string' && cityQuery.trim().length > 0
      ? cityQuery.toLowerCase()
      : 'mumbai';
  const initialData = await getInitialMetalData(normalizedCity);

  return (
    <MetalPageClient
      metal={metal}
      initialCity={normalizedCity}
      initialData={initialData}
    />
  );
}
