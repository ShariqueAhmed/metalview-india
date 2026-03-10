/**
 * Dedicated page per metal: /gold, /silver, /copper, /platinum, /palladium
 * Renders full price view for that metal with city selector (no tabs).
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MetalPageClient from './MetalPageClient';

const METALS = ['gold', 'silver', 'copper', 'platinum', 'palladium'] as const;
type MetalSlug = (typeof METALS)[number];

function isValidMetal(metal: string): metal is MetalSlug {
  return METALS.includes(metal as MetalSlug);
}

interface PageProps {
  params: Promise<{ metal: string }>;
  searchParams: Promise<{ city?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { metal } = await params;
  if (!isValidMetal(metal)) return { title: 'Metal | MetalView' };
  const name = metal.charAt(0).toUpperCase() + metal.slice(1);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  return {
    title: `${name} Price Today in India - Live Rates | MetalView`,
    description: `Get live ${name} prices in India today. Check ${name} rate per gram, 10g or kg. Real-time updates for Mumbai, Delhi, Bangalore and more.`,
    openGraph: {
      title: `${name} Price Today in India | MetalView`,
      description: `Live ${name} prices in India. Real-time rates and historical trends.`,
      url: `${baseUrl}/${metal}`,
      siteName: 'MetalView',
    },
    alternates: { canonical: `${baseUrl}/${metal}` },
  };
}

export default async function MetalPage({ params, searchParams }: PageProps) {
  const { metal } = await params;
  const { city: cityQuery } = await searchParams;

  if (!metal || !isValidMetal(metal)) {
    notFound();
  }

  return (
    <MetalPageClient
      metal={metal}
      initialCity={typeof cityQuery === 'string' ? cityQuery : undefined}
    />
  );
}
