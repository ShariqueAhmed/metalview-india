'use client';

interface StructuredDataProps {
  gold24k_10g?: number | null;
  gold22k_10g?: number | null;
  silver_1kg?: number | null;
  copper_1kg?: number | null;
  platinum_10g?: number | null;
  palladium_10g?: number | null;
  location?: string;
  lastUpdated?: string;
  metalType?: 'gold' | 'silver' | 'copper' | 'platinum' | 'palladium';
}

export default function StructuredData({
  gold24k_10g,
  gold22k_10g,
  silver_1kg,
  copper_1kg,
  platinum_10g,
  palladium_10g,
  location,
  lastUpdated,
  metalType = 'gold',
}: StructuredDataProps) {
  const formatDate = (timestamp?: string) => {
    if (!timestamp) return new Date().toISOString();
    try {
      return new Date(timestamp).toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://metalview.in';
  const cityName = location ? location.charAt(0).toUpperCase() + location.slice(1) : 'India';

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MetalView India',
    url: baseUrl,
    logo: `${baseUrl}/og-image.svg`,
    description: 'Real-time precious metals pricing and market insights for India',
    sameAs: [
      // Add social media links if available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${metalType.charAt(0).toUpperCase() + metalType.slice(1)} Prices`,
        item: `${baseUrl}?metal=${metalType}`,
      },
      ...(location
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: cityName,
              item: `${baseUrl}?metal=${metalType}&city=${location}`,
            },
          ]
        : []),
    ],
  };

  // FinancialProduct Schema (for metal prices)
  const offers: Array<{
    '@type': string;
    itemOffered: {
      '@type': string;
      name: string;
      description: string;
      category: string;
    };
    price: number;
    priceCurrency: string;
    availability: string;
  }> = [];

  if (gold24k_10g) {
    offers.push({
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
    });
  }

  if (gold22k_10g) {
    offers.push({
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
    });
  }

  if (silver_1kg) {
    offers.push({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Silver (1 kilogram)',
        description: 'Silver price per kilogram',
        category: 'Precious Metal',
      },
      price: silver_1kg,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    });
  }

  if (copper_1kg) {
    offers.push({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Copper (1 kilogram)',
        description: 'Copper price per kilogram',
        category: 'Industrial Metal',
      },
      price: copper_1kg,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    });
  }

  if (platinum_10g) {
    offers.push({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Platinum (10 grams)',
        description: 'Platinum price per 10 grams',
        category: 'Precious Metal',
      },
      price: platinum_10g,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    });
  }

  if (palladium_10g) {
    offers.push({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Palladium (10 grams)',
        description: 'Palladium price per 10 grams',
        category: 'Precious Metal',
      },
      price: palladium_10g,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    });
  }

  const financialProductSchema = offers.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        name: `${metalType.charAt(0).toUpperCase() + metalType.slice(1)} Prices in ${cityName}`,
        description: `Live ${metalType} prices in ${cityName}. Real-time pricing updates with historical trends.`,
        provider: {
          '@type': 'Organization',
          name: 'MetalView India',
          url: baseUrl,
        },
        offers,
        dateModified: formatDate(lastUpdated),
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
      }
    : null;

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MetalView India',
    url: baseUrl,
    description: 'Real-time precious metals pricing and market insights for India',
    publisher: {
      '@type': 'Organization',
      name: 'MetalView India',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?city={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {financialProductSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
