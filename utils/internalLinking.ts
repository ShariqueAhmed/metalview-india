/**
 * Smart Internal Linking Algorithm
 * Scores and ranks related pages based on relevance for better link distribution
 */

import { formatCityName } from './conversions';

export interface RelatedPage {
  title: string;
  href: string;
  description?: string;
  score: number;
  type: 'metal-city' | 'city' | 'guide' | 'comparison' | 'trend' | 'blog';
}

export interface CurrentPage {
  metal?: string;
  city?: string;
  type: 'home' | 'city' | 'metal-city' | 'blog' | 'guide' | 'comparison' | 'trend';
  slug?: string; // For blog posts
}

// Top cities for recommendations
const TOP_CITIES = [
  'mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai',
  'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'surat',
  'lucknow', 'kanpur', 'nagpur', 'indore', 'thane',
];

// All metals
const METALS = ['gold', 'silver', 'copper', 'platinum', 'palladium'];

// Guide pages with metadata
const GUIDE_PAGES: Array<{ slug: string; title: string; href: string; description: string; metal?: string }> = [
  { slug: 'gold-price-guide', title: 'Gold Price Guide', href: '/gold-price-guide', description: 'Complete guide to gold prices, purity, and investment', metal: 'gold' },
  { slug: 'silver-investment-guide', title: 'Silver Investment Guide', href: '/silver-investment-guide', description: 'Complete guide to silver prices and investment strategies', metal: 'silver' },
  { slug: 'investment-guide', title: 'Investment Guide', href: '/investment-guide', description: 'Complete guide to metal investments and strategies' },
  { slug: 'best-cities-to-buy-gold', title: 'Best Cities to Buy Gold', href: '/best-cities-to-buy-gold', description: 'Compare prices across major Indian cities', metal: 'gold' },
  { slug: 'copper-price-guide', title: 'Copper Price Guide', href: '/copper-price-guide', description: 'Complete guide to copper prices and trends', metal: 'copper' },
  { slug: 'platinum-investment-guide', title: 'Platinum Investment Guide', href: '/platinum-investment-guide', description: 'Complete guide to platinum prices and investment', metal: 'platinum' },
];

// Comparison pages
const COMPARISON_PAGES: Array<{ slug: string; title: string; href: string; description: string; metals?: string[] }> = [
  { slug: 'gold-vs-silver-investment', title: 'Gold vs Silver Investment', href: '/gold-vs-silver-investment', description: 'Compare gold and silver as investment options', metals: ['gold', 'silver'] },
  { slug: '24k-vs-22k-vs-18k-gold', title: '24K vs 22K vs 18K Gold', href: '/24k-vs-22k-vs-18k-gold', description: 'Compare gold purity levels and find which is best', metals: ['gold'] },
];

// Trend pages
const TREND_PAGES: Array<{ slug: string; title: string; href: string; description: string; metal?: string }> = [
  { slug: 'gold-price-trends-2025', title: 'Gold Price Trends 2025', href: '/gold-price-trends-2025', description: 'Expert analysis and predictions for gold prices', metal: 'gold' },
];

// Blog posts (sample - can be expanded)
const BLOG_POSTS: Array<{ slug: string; title: string; href: string; description: string; metal?: string }> = [
  { slug: 'understanding-gold-purity-24k-vs-22k', title: 'Understanding Gold Purity: 24K vs 22K', href: '/blog/understanding-gold-purity-24k-vs-22k', description: 'Learn about gold purity levels and their differences', metal: 'gold' },
  { slug: 'gold-investment-strategies', title: 'Gold Investment Strategies', href: '/blog/gold-investment-strategies', description: 'Expert strategies for investing in gold', metal: 'gold' },
  { slug: 'factors-affecting-gold-prices', title: 'Factors Affecting Gold Prices', href: '/blog/factors-affecting-gold-prices', description: 'Understand what influences gold prices', metal: 'gold' },
  { slug: 'best-time-to-buy-gold', title: 'Best Time to Buy Gold', href: '/blog/best-time-to-buy-gold', description: 'When is the optimal time to invest in gold?', metal: 'gold' },
];

/**
 * Get related pages with smart scoring algorithm
 */
export function getRelatedPages(currentPage: CurrentPage): RelatedPage[] {
  const related: RelatedPage[] = [];
  const { metal, city, type } = currentPage;

  // Score pages based on relevance
  // - Same metal, different city: score 0.9
  // - Same city, different metal: score 0.8
  // - Related guides: score 0.7
  // - Related comparisons: score 0.7
  // - Related trends: score 0.7
  // - Related blog posts: score 0.6
  // - Other guides: score 0.5
  // - Other cities (same metal): score 0.4

  if (type === 'metal-city' && metal && city) {
    // Same metal, different cities (score 0.9)
    TOP_CITIES.filter((c) => c !== city)
      .slice(0, 5)
      .forEach((otherCity) => {
        related.push({
          title: `${metal.charAt(0).toUpperCase() + metal.slice(1)} Price in ${formatCityName(otherCity)}`,
          href: `/${metal}/price-in/${otherCity}`,
          description: `Check ${metal} prices in ${formatCityName(otherCity)}`,
          score: 0.9,
          type: 'metal-city',
        });
      });

    // Same city, different metals (score 0.8)
    METALS.filter((m) => m !== metal)
      .slice(0, 3)
      .forEach((otherMetal) => {
        related.push({
          title: `${otherMetal.charAt(0).toUpperCase() + otherMetal.slice(1)} Price in ${formatCityName(city)}`,
          href: `/${otherMetal}/price-in/${city}`,
          description: `Check ${otherMetal} prices in ${formatCityName(city)}`,
          score: 0.8,
          type: 'metal-city',
        });
      });

    // Related guides for this metal (score 0.7)
    GUIDE_PAGES.filter((guide) => guide.metal === metal)
      .forEach((guide) => {
        related.push({
          title: guide.title,
          href: guide.href,
          description: guide.description,
          score: 0.7,
          type: 'guide',
        });
      });

    // Related comparisons (score 0.7)
    COMPARISON_PAGES.filter((comp) => comp.metals?.includes(metal))
      .forEach((comp) => {
        related.push({
          title: comp.title,
          href: comp.href,
          description: comp.description,
          score: 0.7,
          type: 'comparison',
        });
      });

    // Related trends (score 0.7)
    TREND_PAGES.filter((trend) => trend.metal === metal)
      .forEach((trend) => {
        related.push({
          title: trend.title,
          href: trend.href,
          description: trend.description,
          score: 0.7,
          type: 'trend',
        });
      });

    // Related blog posts (score 0.6)
    BLOG_POSTS.filter((post) => post.metal === metal)
      .slice(0, 2)
      .forEach((post) => {
        related.push({
          title: post.title,
          href: post.href,
          description: post.description,
          score: 0.6,
          type: 'blog',
        });
      });
  } else if (type === 'city' && city) {
    // Different metals in same city (score 0.8)
    METALS.slice(0, 5)
      .forEach((metalType) => {
        related.push({
          title: `${metalType.charAt(0).toUpperCase() + metalType.slice(1)} Price in ${formatCityName(city)}`,
          href: `/${metalType}/price-in/${city}`,
          description: `Check ${metalType} prices in ${formatCityName(city)}`,
          score: 0.8,
          type: 'metal-city',
        });
      });

    // Related guides (score 0.7)
    GUIDE_PAGES.slice(0, 3)
      .forEach((guide) => {
        related.push({
          title: guide.title,
          href: guide.href,
          description: guide.description,
          score: 0.7,
          type: 'guide',
        });
      });
  } else if (type === 'guide' || type === 'comparison' || type === 'trend') {
    // Related guides/comparisons/trends (score 0.7)
    GUIDE_PAGES.slice(0, 3)
      .forEach((guide) => {
        related.push({
          title: guide.title,
          href: guide.href,
          description: guide.description,
          score: 0.7,
          type: 'guide',
        });
      });

    COMPARISON_PAGES.forEach((comp) => {
      related.push({
        title: comp.title,
        href: comp.href,
        description: comp.description,
        score: 0.7,
        type: 'comparison',
      });
    });

    TREND_PAGES.forEach((trend) => {
      related.push({
        title: trend.title,
        href: trend.href,
        description: trend.description,
        score: 0.7,
        type: 'trend',
      });
    });
  } else {
    // Homepage: mix of popular content
    GUIDE_PAGES.slice(0, 2)
      .forEach((guide) => {
        related.push({
          title: guide.title,
          href: guide.href,
          description: guide.description,
          score: 0.7,
          type: 'guide',
        });
      });

    COMPARISON_PAGES.slice(0, 1)
      .forEach((comp) => {
        related.push({
          title: comp.title,
          href: comp.href,
          description: comp.description,
          score: 0.7,
          type: 'comparison',
        });
      });

    TREND_PAGES.slice(0, 1)
      .forEach((trend) => {
        related.push({
          title: trend.title,
          href: trend.href,
          description: trend.description,
          score: 0.7,
          type: 'trend',
        });
      });
  }

  // Remove duplicates based on href
  const uniqueRelated = related.filter(
    (page, index, self) => index === self.findIndex((p) => p.href === page.href)
  );

  // Sort by score (descending) and return top 6
  return uniqueRelated.sort((a, b) => b.score - a.score).slice(0, 6);
}

/**
 * Get related pages for a specific metal
 */
export function getRelatedPagesForMetal(metal: string, excludeCity?: string): RelatedPage[] {
  return getRelatedPages({
    metal,
    city: excludeCity,
    type: 'metal-city',
  });
}

/**
 * Get related pages for a specific city
 */
export function getRelatedPagesForCity(city: string): RelatedPage[] {
  return getRelatedPages({
    city,
    type: 'city',
  });
}
