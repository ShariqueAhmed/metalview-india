'use client';

interface StructuredDataProps {
  gold24k_1g?: number | null;
  gold24k_10g?: number | null;
  gold22k_1g?: number | null;
  gold22k_10g?: number | null;
  location?: string;
  lastUpdated?: string;
}

export default function StructuredData({
  gold24k_1g,
  gold24k_10g,
  gold22k_1g,
  gold22k_10g,
  location,
  lastUpdated,
}: StructuredDataProps) {
  if (!gold24k_1g && !gold24k_10g) {
    return null;
  }

  const formatDate = (timestamp?: string) => {
    if (!timestamp) return new Date().toISOString();
    try {
      return new Date(timestamp).toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `Gold Prices in ${location || 'India'}`,
    description: `Live gold prices for 24K and 22K gold in ${location || 'India'}`,
    provider: {
      '@type': 'Organization',
      name: 'MetalView',
      url: 'https://metalview.in',
    },
    offers: [
      ...(gold24k_1g
        ? [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: '24 Karat Gold (1 gram)',
                description: '24K pure gold price per gram',
                category: 'Precious Metal',
              },
              price: gold24k_1g,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
          ]
        : []),
      ...(gold24k_10g
        ? [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: '24 Karat Gold (10 grams)',
                description: '24K pure gold price per 10 grams',
                category: 'Precious Metal',
              },
              price: gold24k_10g,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
          ]
        : []),
      ...(gold22k_1g
        ? [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: '22 Karat Gold (1 gram)',
                description: '22K gold price per gram',
                category: 'Precious Metal',
              },
              price: gold22k_1g,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
          ]
        : []),
      ...(gold22k_10g
        ? [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: '22 Karat Gold (10 grams)',
                description: '22K gold price per 10 grams',
                category: 'Precious Metal',
              },
              price: gold22k_10g,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
          ]
        : []),
    ],
    dateModified: formatDate(lastUpdated),
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
