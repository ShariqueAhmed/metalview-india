/**
 * SEO Utility Functions
 * Generates SEO metadata and structured data
 */

import { Metadata } from 'next';

export interface SEOData {
  title: string;
  description: string;
  city?: string;
  metal?: 'gold' | 'silver' | 'copper' | 'platinum';
  price?: number;
}

/**
 * Generate metadata for metal price pages
 */
export function generateMetalMetadata(data: SEOData): Metadata {
  const { title, description, city, metal } = data;

  const cityName = city ? formatCityName(city) : 'India';
  const metalName = metal ? metal.charAt(0).toUpperCase() + metal.slice(1) : 'Metal';

  return {
    title: `${title} | SuperMetal`,
    description,
    keywords: [
      `${metal || 'metal'} price in ${cityName.toLowerCase()}`,
      `${metal || 'metal'} rate today`,
      `live ${metal || 'metal'} price`,
      `${cityName} ${metal || 'metal'} price`,
      `today ${metal || 'metal'} rate`,
      `current ${metal || 'metal'} price`,
    ],
    openGraph: {
      title: `${title} | SuperMetal`,
      description,
      type: 'website',
      locale: 'en_IN',
      siteName: 'SuperMetal',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | SuperMetal`,
      description,
    },
    alternates: {
      canonical: `https://supermetal.in/${metal}-price-today-in-${city || 'india'}`,
    },
  };
}

/**
 * Format city name for display
 */
function formatCityName(city: string | null | undefined): string {
  if (!city) return 'India';
  return city
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Generate JSON-LD structured data for metal prices
 */
export function generateStructuredData(data: {
  metal: string;
  price: number;
  unit: string;
  city: string | null | undefined;
  updatedAt: string;
}): object {
  const { metal, price, unit, city, updatedAt } = data;
  const cityName = formatCityName(city);

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${metal.charAt(0).toUpperCase() + metal.slice(1)} Price in ${cityName}`,
    description: `Live ${metal} price in ${cityName}, India. Current rate: ₹${price} per ${unit}`,
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date(updatedAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
    },
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedIn: {
        '@type': 'Country',
        name: 'India',
      },
    },
    dateModified: updatedAt,
  };
}
