import { SITEMAP_TOP_CITIES } from '@/utils/sitemapConstants';

export const SUPPORTED_METALS = [
  'gold',
  'silver',
  'copper',
  'platinum',
  'palladium',
] as const;

export type SupportedMetal = (typeof SUPPORTED_METALS)[number];

export const SUPPORTED_CITY_SLUGS = [...SITEMAP_TOP_CITIES] as readonly string[];

export function isSupportedMetal(value: string): value is SupportedMetal {
  return SUPPORTED_METALS.includes(value as SupportedMetal);
}

export function isSupportedCity(value: string): boolean {
  return SUPPORTED_CITY_SLUGS.includes(value.toLowerCase());
}
