/**
 * SEO Utility Functions
 * Generates SEO metadata and structured data
 */

import { Metadata } from 'next';
import { formatIndianCurrency } from './conversions';

export interface SEOData {
  title: string;
  description: string;
  city?: string;
  metal?: 'gold' | 'silver' | 'copper' | 'platinum' | 'palladium';
  price?: number;
  unit?: string; // e.g., '10g', '1kg', '1g'
  priceRange?: {
    min: number;
    max: number;
  };
}

/**
 * Generate metadata for metal price pages
 */
export function generateMetalMetadata(data: SEOData): Metadata {
  const { title, description, city, metal, price, unit } = data;

  const cityName = city ? formatCityName(city) : 'India';
  const metalName = metal && typeof metal === 'string' ? metal.charAt(0).toUpperCase() + metal.slice(1) : 'Metal';

  // Enhance title with price when available
  const priceForTitle = price && price > 0 ? formatPriceForTitle(price, unit) : '';
  const enhancedTitle = priceForTitle 
    ? `${title} - ${priceForTitle}`
    : title;

  // Enhance description with price when available
  // formatIndianCurrency already includes ₹ symbol, so we use it directly
  let priceText = '';
  
  // Prioritize price range if available, otherwise use single price
  if (data.priceRange && data.priceRange.min > 0 && data.priceRange.max > 0) {
    priceText = ` Price range: ${formatIndianCurrency(data.priceRange.min)} - ${formatIndianCurrency(data.priceRange.max)}${unit ? ` per ${unit}` : ''}.`;
  } else if (price && price > 0) {
    priceText = ` Current rate: ${formatIndianCurrency(price)}${unit ? ` per ${unit}` : ''}.`;
  }
  
  const enhancedDescription = priceText 
    ? `${description}${priceText} Real-time updates with historical trends.`
    : `${description} Real-time updates with historical trends.`;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  const ogImageUrl = `${baseUrl}/api/og?metal=${metal || 'gold'}&city=${city || 'india'}${price ? `&price=${price}` : ''}`;

  return {
    title: `${enhancedTitle} | MetalView India`,
    description: enhancedDescription,
    keywords: [
      `${metal || 'metal'} price in ${cityName.toLowerCase()}`,
      `${metal || 'metal'} rate today`,
      `live ${metal || 'metal'} price`,
      `${cityName} ${metal || 'metal'} price`,
      `today ${metal || 'metal'} rate`,
      `current ${metal || 'metal'} price`,
      ...(price ? [`${metal || 'metal'} price ₹${price}`, `${cityName.toLowerCase()} ${metal || 'metal'} rate`] : []),
    ],
    openGraph: {
      title: `${enhancedTitle} | MetalView India`,
      description: enhancedDescription,
      type: 'website',
      locale: 'en_IN',
      siteName: 'MetalView India',
      url: `${baseUrl}/${metal || 'gold'}/price-in/${city || 'india'}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${metalName} price in ${cityName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${enhancedTitle} | MetalView India`,
      description: enhancedDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/${metal || 'gold'}/price-in/${city || 'india'}`,
    },
  };
}

/**
 * Format city name for display
 */
export function formatCityName(city: string | null | undefined): string {
  if (!city) return 'India';
  return city
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Generate AggregateOffer schema for multi-city prices
 * Shows price ranges across different cities
 */
export function generateAggregateOfferSchema(
  cityPrices: Array<{ city: string; price: number }>,
  metal: string,
  unit: string = '10g'
): object {
  if (!cityPrices || cityPrices.length === 0) {
    return {};
  }

  const prices = cityPrices
    .map((cp) => cp.price)
    .filter((p) => p && p > 0) as number[];

  if (prices.length === 0) {
    return {};
  }

  const metalName = metal.charAt(0).toUpperCase() + metal.slice(1);
  const unitCode = unit.includes('kg') || unit.includes('kilogram') ? 'KGM' : 'GRM';

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    name: `${metalName} Price Range Across Indian Cities`,
    description: `Compare ${metalName} prices across major Indian cities. Price range: ₹${Math.min(...prices).toFixed(2)} - ₹${Math.max(...prices).toFixed(2)} per ${unit}.`,
    priceCurrency: 'INR',
    lowPrice: Math.min(...prices).toFixed(2),
    highPrice: Math.max(...prices).toFixed(2),
    offerCount: cityPrices.length,
    offers: cityPrices
      .filter((cp) => cp.price && cp.price > 0)
      .map((cp) => ({
        '@type': 'Offer',
        price: cp.price.toFixed(2),
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: cp.price.toFixed(2),
          priceCurrency: 'INR',
          unitCode: unitCode,
          valueAddedTaxIncluded: false,
        },
        areaServed: {
          '@type': 'City',
          name: formatCityName(cp.city),
          containedIn: {
            '@type': 'Country',
            name: 'India',
          },
        },
      })),
  };
}

/**
 * Format price for title tags (compact format)
 * Returns format like "₹65,000/10g" or "₹85,000/1kg"
 */
function formatPriceForTitle(price: number, unit?: string): string {
  if (!price || price <= 0) return '';
  
  // Format price without currency symbol (we'll add ₹ manually for compactness)
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  
  return unit ? `₹${formattedPrice}/${unit}` : `₹${formattedPrice}`;
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
  if (!metal || typeof metal !== 'string') {
    throw new Error('Metal must be a valid string');
  }
  const cityName = formatCityName(city);

  // Determine unit code (GRM for grams, KGM for kilograms)
  const unitCode = unit.includes('kg') || unit.includes('kilogram') ? 'KGM' : 'GRM';
  
  // Calculate valid dates (24 hours from update)
  const validFrom = new Date(updatedAt).toISOString();
  const validThroughDate = new Date(updatedAt);
  validThroughDate.setHours(validThroughDate.getHours() + 24);
  const validThrough = validThroughDate.toISOString();

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
      priceValidUntil: validThrough,
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: price.toFixed(2),
        priceCurrency: 'INR',
        unitCode: unitCode,
        valueAddedTaxIncluded: false,
        validFrom: validFrom,
        validThrough: validThrough,
      },
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

/**
 * Generate Price Prediction Schema for structured data
 * Used for pages with price forecasts and predictions
 */
export function generatePricePredictionSchema(data: {
  metal: string;
  currentPrice: number;
  predictedPrice: number;
  predictionDate: string;
  confidence: number;
  unit?: string;
  city?: string;
  baseUrl?: string;
}): object {
  const { metal, currentPrice, predictedPrice, predictionDate, confidence, unit = '10g', city, baseUrl = 'https://metalview.in' } = data;
  
  const metalName = metal.charAt(0).toUpperCase() + metal.slice(1);
  const cityName = city ? formatCityName(city) : 'India';
  const unitCode = unit.includes('kg') || unit.includes('kilogram') ? 'KGM' : 'GRM';

  return {
    '@context': 'https://schema.org',
    '@type': 'Prediction',
    name: `${metalName} Price Prediction for ${cityName}`,
    description: `Price prediction for ${metalName} in ${cityName}. Current price: ₹${currentPrice.toFixed(2)} per ${unit}. Predicted price: ₹${predictedPrice.toFixed(2)} per ${unit}.`,
    about: {
      '@type': 'FinancialProduct',
      name: `${metalName} Price`,
      description: `Live ${metalName} price in ${cityName}, India`,
      category: 'Precious Metal',
      offers: {
        '@type': 'Offer',
        price: currentPrice.toFixed(2),
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: currentPrice.toFixed(2),
          priceCurrency: 'INR',
          unitCode: unitCode,
          valueAddedTaxIncluded: false,
        },
      },
    },
    predictionDate: predictionDate,
    confidence: Math.min(Math.max(confidence, 0), 100), // Clamp between 0-100
    value: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: predictedPrice.toFixed(2),
    },
    url: city 
      ? `${baseUrl}/${metal}/price-in/${city}`
      : `${baseUrl}/`,
    areaServed: city
      ? {
          '@type': 'City',
          name: cityName,
          containedIn: {
            '@type': 'Country',
            name: 'India',
          },
        }
      : {
          '@type': 'Country',
          name: 'India',
        },
  };
}

/**
 * Generate Dataset Schema for Historical Price Data
 * Used to mark up historical price data for better search visibility
 */
export function generateDatasetSchema(data: {
  metal: string;
  city: string;
  dataPoints: Array<{ date: string; price: number }>;
  baseUrl?: string;
}): object {
  const { metal, city, dataPoints, baseUrl = 'https://metalview.in' } = data;
  
  if (!dataPoints || dataPoints.length === 0) {
    return {};
  }

  const metalName = metal.charAt(0).toUpperCase() + metal.slice(1);
  const cityName = formatCityName(city);
  
  // Get first and last dates from data points
  const sortedDataPoints = [...dataPoints].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const datePublished = sortedDataPoints[0]?.date;
  const dateModified = sortedDataPoints[sortedDataPoints.length - 1]?.date;

  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${metalName} Price History - ${cityName}`,
    description: `Historical ${metalName.toLowerCase()} prices in ${cityName}, India. Contains ${dataPoints.length} data points with daily price information.`,
    keywords: `${metalName.toLowerCase()}, price, history, ${cityName}, india, metal prices, historical data, price trends`,
    creator: {
      '@type': 'Organization',
      name: 'MetalView India',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetalView India',
      url: baseUrl,
    },
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    temporalCoverage: datePublished && dateModified 
      ? `${datePublished}/${dateModified}`
      : undefined,
    spatialCoverage: {
      '@type': 'City',
      name: cityName,
      containedIn: {
        '@type': 'Country',
        name: 'India',
      },
    },
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: `${baseUrl}/api/historical/${metal}/${city}`,
      description: `JSON API endpoint for ${metalName.toLowerCase()} price history in ${cityName}`,
    },
    variableMeasured: {
      '@type': 'PropertyValue',
      name: 'Price',
      unitText: 'INR',
      description: `Price of ${metalName.toLowerCase()} per unit`,
    },
    numberOfItems: dataPoints.length,
    license: `${baseUrl}/terms`,
  };
}
