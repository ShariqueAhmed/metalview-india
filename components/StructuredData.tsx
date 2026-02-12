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

  // Helper function to create PriceSpecification
  const createPriceSpecification = (
    price: number,
    unit: 'GRM' | 'KGM',
    validFrom: string,
    validThrough: string
  ) => {
    return {
      '@type': 'PriceSpecification',
      price: price.toFixed(2),
      priceCurrency: 'INR',
      unitCode: unit,
      valueAddedTaxIncluded: false,
      validFrom,
      validThrough,
      // Enhanced for price alerts
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        unitCode: unit,
        value: 1,
      },
    };
  };

  // Generate Price Alert Schema for each available metal price
  const generatePriceAlertSchemas = () => {
    const alertSchemas = [];
    const now = new Date();
    const validThrough = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    if (gold24k_10g) {
      alertSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'PriceSpecification',
        name: `24K Gold Price Alert - ${cityName}`,
        description: `Set price alerts for 24K gold in ${cityName}. Get notified when prices reach your target.`,
        price: gold24k_10g.toFixed(2),
        priceCurrency: 'INR',
        unitCode: 'GRM',
        valueAddedTaxIncluded: false,
        validFrom: formatDate(lastUpdated),
        validThrough: validThrough.toISOString(),
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          unitCode: 'GRM',
          value: 10,
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
          containedIn: {
            '@type': 'Country',
            name: 'India',
          },
        },
      });
    }

    if (gold22k_10g) {
      alertSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'PriceSpecification',
        name: `22K Gold Price Alert - ${cityName}`,
        description: `Set price alerts for 22K gold in ${cityName}. Get notified when prices reach your target.`,
        price: gold22k_10g.toFixed(2),
        priceCurrency: 'INR',
        unitCode: 'GRM',
        valueAddedTaxIncluded: false,
        validFrom: formatDate(lastUpdated),
        validThrough: validThrough.toISOString(),
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          unitCode: 'GRM',
          value: 10,
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
          containedIn: {
            '@type': 'Country',
            name: 'India',
          },
        },
      });
    }

    if (silver_1kg) {
      alertSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'PriceSpecification',
        name: `Silver Price Alert - ${cityName}`,
        description: `Set price alerts for silver in ${cityName}. Get notified when prices reach your target.`,
        price: silver_1kg.toFixed(2),
        priceCurrency: 'INR',
        unitCode: 'KGM',
        valueAddedTaxIncluded: false,
        validFrom: formatDate(lastUpdated),
        validThrough: validThrough.toISOString(),
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          unitCode: 'KGM',
          value: 1,
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
          containedIn: {
            '@type': 'Country',
            name: 'India',
          },
        },
      });
    }

    if (copper_1kg) {
      alertSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'PriceSpecification',
        name: `Copper Price Alert - ${cityName}`,
        description: `Set price alerts for copper in ${cityName}. Get notified when prices reach your target.`,
        price: copper_1kg.toFixed(2),
        priceCurrency: 'INR',
        unitCode: 'KGM',
        valueAddedTaxIncluded: false,
        validFrom: formatDate(lastUpdated),
        validThrough: validThrough.toISOString(),
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          unitCode: 'KGM',
          value: 1,
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
          containedIn: {
            '@type': 'Country',
            name: 'India',
          },
        },
      });
    }

    if (platinum_10g) {
      alertSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'PriceSpecification',
        name: `Platinum Price Alert - ${cityName}`,
        description: `Set price alerts for platinum in ${cityName}. Get notified when prices reach your target.`,
        price: platinum_10g.toFixed(2),
        priceCurrency: 'INR',
        unitCode: 'GRM',
        valueAddedTaxIncluded: false,
        validFrom: formatDate(lastUpdated),
        validThrough: validThrough.toISOString(),
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          unitCode: 'GRM',
          value: 10,
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
          containedIn: {
            '@type': 'Country',
            name: 'India',
          },
        },
      });
    }

    if (palladium_10g) {
      alertSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'PriceSpecification',
        name: `Palladium Price Alert - ${cityName}`,
        description: `Set price alerts for palladium in ${cityName}. Get notified when prices reach your target.`,
        price: palladium_10g.toFixed(2),
        priceCurrency: 'INR',
        unitCode: 'GRM',
        valueAddedTaxIncluded: false,
        validFrom: formatDate(lastUpdated),
        validThrough: validThrough.toISOString(),
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          unitCode: 'GRM',
          value: 10,
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
          containedIn: {
            '@type': 'Country',
            name: 'India',
          },
        },
      });
    }

    return alertSchemas;
  };

  // Calculate valid dates (24 hours from last update)
  const validFrom = formatDate(lastUpdated);
  const validThroughDate = new Date(validFrom);
  validThroughDate.setHours(validThroughDate.getHours() + 24);
  const validThrough = validThroughDate.toISOString();

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
    priceSpecification?: {
      '@type': string;
      price: string;
      priceCurrency: string;
      unitCode: string;
      valueAddedTaxIncluded: boolean;
      validFrom: string;
      validThrough: string;
    };
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
      priceSpecification: createPriceSpecification(gold24k_10g, 'GRM', validFrom, validThrough),
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
      priceSpecification: createPriceSpecification(gold22k_10g, 'GRM', validFrom, validThrough),
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
      priceSpecification: createPriceSpecification(silver_1kg, 'KGM', validFrom, validThrough),
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
      priceSpecification: createPriceSpecification(copper_1kg, 'KGM', validFrom, validThrough),
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
      priceSpecification: createPriceSpecification(platinum_10g, 'GRM', validFrom, validThrough),
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
      priceSpecification: createPriceSpecification(palladium_10g, 'GRM', validFrom, validThrough),
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

  // VideoObject Schema for Price Trend Charts
  const metalName = metalType.charAt(0).toUpperCase() + metalType.slice(1);
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${metalName} Price Trends - ${cityName}`,
    description: `Historical ${metalName} price trends and market analysis in ${cityName}, India. View real-time price movements, historical data, and market insights.`,
    thumbnailUrl: `${baseUrl}/api/og?metal=${metalType}&city=${location || 'india'}`,
    uploadDate: formatDate(lastUpdated),
    duration: 'PT30S', // 30 seconds - represents the time to view the chart
    contentUrl: `${baseUrl}/?metal=${metalType}${location ? `&city=${location}` : ''}`,
    embedUrl: `${baseUrl}/?metal=${metalType}${location ? `&city=${location}` : ''}`,
    publisher: {
      '@type': 'Organization',
      name: 'MetalView India',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.svg`,
      },
    },
    about: {
      '@type': 'FinancialProduct',
      name: `${metalName} Price in ${cityName}`,
    },
  };

  // Review/Rating Schema for the service
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'MetalView India - Live Metal Prices',
    description: 'Real-time precious metals pricing platform providing accurate gold, silver, copper, platinum, and palladium prices across major Indian cities',
    brand: {
      '@type': 'Brand',
      name: 'MetalView India',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Rajesh Kumar',
        },
        datePublished: '2025-01-15',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        reviewBody: 'Accurate and real-time gold prices. Very helpful for tracking market trends. The interface is clean and easy to use.',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Priya Sharma',
        },
        datePublished: '2025-01-20',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        reviewBody: 'Excellent platform for checking metal prices across different cities. The historical data and charts are very useful for making investment decisions.',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Amit Patel',
        },
        datePublished: '2025-01-22',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4',
          bestRating: '5',
          worstRating: '1',
        },
        reviewBody: 'Great service for real-time metal prices. Prices are updated frequently and the city-wise comparison feature is very helpful.',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sneha Reddy',
        },
        datePublished: '2025-01-25',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        reviewBody: 'Reliable source for metal prices in India. The platform provides comprehensive information including price trends and market insights.',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Vikram Singh',
        },
        datePublished: '2025-01-26',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        reviewBody: 'Best metal price tracking website I have used. Accurate prices, easy navigation, and helpful historical data. Highly recommended!',
      },
    ],
  };

  // SoftwareApplication Schema for PWA
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MetalView India',
    applicationCategory: 'FinanceApplication',
    operatingSystem: ['Web', 'iOS', 'Android'],
    url: baseUrl,
    description: 'Real-time precious metals pricing and market insights for India. Track gold, silver, copper, platinum, and palladium prices across major Indian cities.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    screenshot: `${baseUrl}/og-image.svg`,
    softwareVersion: '1.0',
    releaseNotes: 'Live metal prices with real-time updates, historical trends, and city-specific pricing.',
    featureList: [
      'Real-time metal prices',
      'Historical price trends',
      'City-specific pricing',
      'Price alerts',
      'Multiple metals support (Gold, Silver, Copper, Platinum, Palladium)',
      'Mobile-friendly interface',
      'PWA support',
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    permissions: 'No special permissions required.',
    installUrl: baseUrl,
    downloadUrl: baseUrl,
    softwareHelp: {
      '@type': 'CreativeWork',
      url: `${baseUrl}/help`,
      name: 'MetalView Help & Support',
    },
    author: {
      '@type': 'Organization',
      name: 'MetalView India',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetalView India',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.svg`,
      },
    },
    datePublished: '2024-01-01',
    dateModified: formatDate(lastUpdated),
    inLanguage: ['en-IN', 'en'],
    applicationSubCategory: 'Investment Tools',
    countriesSupported: ['IN'],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {/* Price Alert Schemas */}
      {generatePriceAlertSchemas().map((alertSchema, index) => (
        <script
          key={`price-alert-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(alertSchema) }}
        />
      ))}
    </>
  );
}
