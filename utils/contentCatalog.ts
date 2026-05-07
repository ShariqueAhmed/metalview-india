import { blogIndexPosts } from '@/utils/blogIndexPosts';
import { formatCityName } from '@/utils/conversions';
import { SUPPORTED_CITY_SLUGS, SUPPORTED_METALS, type SupportedMetal } from '@/utils/routeConstants';

export type CatalogPageType =
  | 'metal-hub'
  | 'metal-city'
  | 'city'
  | 'guide'
  | 'comparison'
  | 'trend'
  | 'blog';

export interface CatalogPage {
  title: string;
  href: string;
  description: string;
  type: CatalogPageType;
  metal?: SupportedMetal;
  metals?: SupportedMetal[];
  city?: string;
  slug?: string;
}

export const PRIMARY_LINK_CITY_SLUGS = SUPPORTED_CITY_SLUGS.slice(0, 15);

export const GUIDE_PAGES: CatalogPage[] = [
  {
    title: 'Gold Price Guide',
    href: '/gold-price-guide',
    description: 'Complete guide to gold prices, purity, and investment decisions in India.',
    type: 'guide',
    metal: 'gold',
    slug: 'gold-price-guide',
  },
  {
    title: 'Silver Investment Guide',
    href: '/silver-investment-guide',
    description: 'Guide to silver prices, investment use cases, and how to compare silver rates responsibly.',
    type: 'guide',
    metal: 'silver',
    slug: 'silver-investment-guide',
  },
  {
    title: 'Copper Price Guide',
    href: '/copper-price-guide',
    description: 'How copper prices work in India, what moves them, and how to use live benchmarks responsibly.',
    type: 'guide',
    metal: 'copper',
    slug: 'copper-price-guide',
  },
  {
    title: 'Platinum Price Guide',
    href: '/platinum-price-guide',
    description: 'How to read platinum prices in India and compare platinum with gold more carefully.',
    type: 'guide',
    metal: 'platinum',
    slug: 'platinum-price-guide',
  },
  {
    title: 'Palladium Price Guide',
    href: '/palladium-price-guide',
    description: 'How to interpret palladium prices in India without over-reading a niche market benchmark.',
    type: 'guide',
    metal: 'palladium',
    slug: 'palladium-price-guide',
  },
  {
    title: 'Investment Guide',
    href: '/investment-guide',
    description: 'Practical guidance on using gold, silver, and other metals in an investment context.',
    type: 'guide',
    slug: 'investment-guide',
  },
  {
    title: 'Best Cities to Buy Gold',
    href: '/best-cities-to-buy-gold',
    description: 'City-by-city context for comparing gold markets, pricing patterns, and buyer considerations.',
    type: 'guide',
    metal: 'gold',
    slug: 'best-cities-to-buy-gold',
  },
];

export const COMPARISON_PAGES: CatalogPage[] = [
  {
    title: 'Gold vs Silver Investment',
    href: '/gold-vs-silver-investment',
    description: 'Compare gold and silver as investment options by use case, volatility, and decision fit.',
    type: 'comparison',
    metals: ['gold', 'silver'],
    slug: 'gold-vs-silver-investment',
  },
  {
    title: '24K vs 22K vs 18K Gold',
    href: '/24k-vs-22k-vs-18k-gold',
    description: 'Purity comparison for Indian gold buyers choosing between 24K, 22K, and 18K.',
    type: 'comparison',
    metals: ['gold'],
    slug: '24k-vs-22k-vs-18k-gold',
  },
];

export const TREND_PAGES: CatalogPage[] = [
  {
    title: 'Gold Price Trends 2025',
    href: '/gold-price-trends-2025',
    description: 'Scenario-based context for understanding gold market direction and pricing trends.',
    type: 'trend',
    metal: 'gold',
    slug: 'gold-price-trends-2025',
  },
];

function inferBlogMetals(post: (typeof blogIndexPosts)[number]): SupportedMetal[] {
  const haystack = `${post.title} ${post.excerpt}`.toLowerCase();
  return SUPPORTED_METALS.filter((metal) => haystack.includes(metal));
}

function inferBlogCity(post: (typeof blogIndexPosts)[number]): string | undefined {
  if (post.category !== 'City Guide') {
    return undefined;
  }

  return SUPPORTED_CITY_SLUGS.find((city) => post.slug.includes(city));
}

export const BLOG_PAGES: CatalogPage[] = blogIndexPosts.map((post) => {
  const metals = inferBlogMetals(post);
  const primaryMetal = metals[0];
  const city = inferBlogCity(post);

  let type: CatalogPageType = 'blog';
  if (post.category === 'Market Analysis') type = 'trend';
  if (post.category === 'Investment' && post.slug.includes('vs')) type = 'comparison';

  return {
    title: post.title,
    href: `/blog/${post.slug}`,
    description: post.excerpt,
    type,
    metal: primaryMetal,
    metals: metals.length > 0 ? metals : undefined,
    city,
    slug: post.slug,
  };
});

export const METAL_HUB_PAGES: CatalogPage[] = SUPPORTED_METALS.map((metal) => ({
  title: `${metal.charAt(0).toUpperCase() + metal.slice(1)} Price Today in India`,
  href: `/${metal}`,
  description: `Live ${metal} prices in India with city switching, history, and supporting guides.`,
  type: 'metal-hub',
  metal,
}));

export const CITY_HUB_PAGES: CatalogPage[] = PRIMARY_LINK_CITY_SLUGS.map((city) => ({
  title: `Metal Prices in ${formatCityName(city)}`,
  href: `/city/${city}`,
  description: `City overview for live metal prices in ${formatCityName(city)}, including gold, silver, copper, platinum, and palladium.`,
  type: 'city',
  city,
}));

export const CONTENT_CATALOG: CatalogPage[] = [
  ...METAL_HUB_PAGES,
  ...CITY_HUB_PAGES,
  ...GUIDE_PAGES,
  ...COMPARISON_PAGES,
  ...TREND_PAGES,
  ...BLOG_PAGES,
];
