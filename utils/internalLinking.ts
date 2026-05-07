/**
 * Data-driven internal linking helpers.
 * Pulls from real routes/content metadata instead of sample placeholder pages.
 */

import { formatCityName } from '@/utils/conversions';
import {
  BLOG_PAGES,
  CITY_HUB_PAGES,
  COMPARISON_PAGES,
  CONTENT_CATALOG,
  GUIDE_PAGES,
  METAL_HUB_PAGES,
  PRIMARY_LINK_CITY_SLUGS,
  TREND_PAGES,
  type CatalogPage,
} from '@/utils/contentCatalog';
import { SUPPORTED_METALS, type SupportedMetal } from '@/utils/routeConstants';

export interface RelatedPage {
  title: string;
  href: string;
  description?: string;
  score: number;
  type: 'metal-hub' | 'metal-city' | 'city' | 'guide' | 'comparison' | 'trend' | 'blog';
}

export interface CurrentPage {
  metal?: string;
  city?: string;
  type: 'home' | 'metal-hub' | 'city' | 'metal-city' | 'blog' | 'guide' | 'comparison' | 'trend';
  slug?: string;
}

function isSupportedMetal(value: string | undefined): value is SupportedMetal {
  return value != null && SUPPORTED_METALS.includes(value as SupportedMetal);
}

function pushUnique(target: RelatedPage[], page: RelatedPage) {
  if (target.some((entry) => entry.href === page.href)) {
    return;
  }

  target.push(page);
}

function addCatalogPages(
  target: RelatedPage[],
  pages: CatalogPage[],
  score: number,
  opts: { excludeHref?: string; excludeSlug?: string; limit?: number } = {}
) {
  const filtered = pages
    .filter((page) => page.href !== opts.excludeHref)
    .filter((page) => page.slug !== opts.excludeSlug)
    .slice(0, opts.limit ?? pages.length);

  filtered.forEach((page) =>
    pushUnique(target, {
      title: page.title,
      href: page.href,
      description: page.description,
      score,
      type: page.type,
    })
  );
}

function getSameMetalBlogPages(metal: SupportedMetal, excludeSlug?: string): CatalogPage[] {
  return BLOG_PAGES.filter((page) => page.metal === metal && page.slug !== excludeSlug);
}

function getSameMetalEditorialPages(metal: SupportedMetal): CatalogPage[] {
  return CONTENT_CATALOG.filter((page) => {
    if (page.type === 'blog' || page.type === 'city' || page.type === 'metal-hub') {
      return false;
    }

    return page.metal === metal || page.metals?.includes(metal);
  });
}

export function getRelatedPages(currentPage: CurrentPage): RelatedPage[] {
  const related: RelatedPage[] = [];
  const normalizedMetal = isSupportedMetal(currentPage.metal)
    ? currentPage.metal
    : undefined;
  const normalizedCity = currentPage.city?.toLowerCase();

  if (currentPage.type === 'metal-city' && normalizedMetal && normalizedCity) {
    PRIMARY_LINK_CITY_SLUGS.filter((city) => city !== normalizedCity)
      .slice(0, 5)
      .forEach((city) => {
        pushUnique(related, {
          title: `${normalizedMetal.charAt(0).toUpperCase() + normalizedMetal.slice(1)} Price in ${formatCityName(city)}`,
          href: `/${normalizedMetal}/price-in/${city}`,
          description: `Compare ${normalizedMetal} prices in ${formatCityName(city)} with ${formatCityName(normalizedCity)}.`,
          score: 0.95,
          type: 'metal-city',
        });
      });

    SUPPORTED_METALS.filter((metal) => metal !== normalizedMetal)
      .slice(0, 4)
      .forEach((metal) => {
        pushUnique(related, {
          title: `${metal.charAt(0).toUpperCase() + metal.slice(1)} Price in ${formatCityName(normalizedCity)}`,
          href: `/${metal}/price-in/${normalizedCity}`,
          description: `See how ${metal} compares with ${normalizedMetal} in ${formatCityName(normalizedCity)}.`,
          score: 0.9,
          type: 'metal-city',
        });
      });

    addCatalogPages(related, getSameMetalEditorialPages(normalizedMetal), 0.8, { limit: 4 });
    addCatalogPages(related, getSameMetalBlogPages(normalizedMetal), 0.72, {
      excludeSlug: currentPage.slug,
      limit: 3,
    });

    pushUnique(related, {
      title: `Metal Prices in ${formatCityName(normalizedCity)}`,
      href: `/city/${normalizedCity}`,
      description: `City-wide overview for all metal prices in ${formatCityName(normalizedCity)}.`,
      score: 0.82,
      type: 'city',
    });
  } else if (currentPage.type === 'metal-hub' && normalizedMetal) {
    PRIMARY_LINK_CITY_SLUGS.slice(0, 6).forEach((city) => {
      pushUnique(related, {
        title: `${normalizedMetal.charAt(0).toUpperCase() + normalizedMetal.slice(1)} Price in ${formatCityName(city)}`,
        href: `/${normalizedMetal}/price-in/${city}`,
        description: `City-specific ${normalizedMetal} price page for ${formatCityName(city)}.`,
        score: 0.92,
        type: 'metal-city',
      });
    });

    addCatalogPages(related, getSameMetalEditorialPages(normalizedMetal), 0.82, { limit: 5 });
    addCatalogPages(related, getSameMetalBlogPages(normalizedMetal), 0.74, { limit: 3 });
    addCatalogPages(related, CITY_HUB_PAGES.slice(0, 2), 0.66);
  } else if (currentPage.type === 'city' && normalizedCity) {
    SUPPORTED_METALS.forEach((metal) => {
      pushUnique(related, {
        title: `${metal.charAt(0).toUpperCase() + metal.slice(1)} Price in ${formatCityName(normalizedCity)}`,
        href: `/${metal}/price-in/${normalizedCity}`,
        description: `Metal-specific ${metal} rates for ${formatCityName(normalizedCity)}.`,
        score: 0.9,
        type: 'metal-city',
      });
    });

    addCatalogPages(
      related,
      BLOG_PAGES.filter((page) => page.city === normalizedCity),
      0.78,
      { excludeSlug: currentPage.slug, limit: 2 }
    );
    addCatalogPages(related, GUIDE_PAGES, 0.7, { limit: 3 });
  } else if (
    (currentPage.type === 'guide' || currentPage.type === 'comparison' || currentPage.type === 'trend' || currentPage.type === 'blog') &&
    normalizedMetal
  ) {
    addCatalogPages(related, getSameMetalEditorialPages(normalizedMetal), 0.83, {
      excludeHref: CONTENT_CATALOG.find((page) => page.slug === currentPage.slug)?.href,
      excludeSlug: currentPage.slug,
      limit: 5,
    });
    addCatalogPages(related, getSameMetalBlogPages(normalizedMetal), 0.72, {
      excludeSlug: currentPage.slug,
      limit: 3,
    });
    addCatalogPages(related, METAL_HUB_PAGES.filter((page) => page.metal === normalizedMetal), 0.84, {
      limit: 1,
    });
    PRIMARY_LINK_CITY_SLUGS.slice(0, 3).forEach((city) => {
      pushUnique(related, {
        title: `${normalizedMetal.charAt(0).toUpperCase() + normalizedMetal.slice(1)} Price in ${formatCityName(city)}`,
        href: `/${normalizedMetal}/price-in/${city}`,
        description: `City-specific ${normalizedMetal} benchmark page for ${formatCityName(city)}.`,
        score: 0.68,
        type: 'metal-city',
      });
    });
  } else {
    addCatalogPages(related, METAL_HUB_PAGES, 0.86, { limit: 3 });
    addCatalogPages(related, GUIDE_PAGES, 0.8, { limit: 3 });
    addCatalogPages(related, COMPARISON_PAGES, 0.76, { limit: 2 });
    addCatalogPages(related, TREND_PAGES, 0.74, { limit: 2 });
    addCatalogPages(related, CITY_HUB_PAGES, 0.68, { limit: 2 });
  }

  return related.sort((a, b) => b.score - a.score).slice(0, 6);
}

export function getRelatedPagesForMetal(metal: string, excludeCity?: string): RelatedPage[] {
  return getRelatedPages({
    metal,
    city: excludeCity,
    type: excludeCity ? 'metal-city' : 'metal-hub',
  });
}

export function getRelatedPagesForCity(city: string): RelatedPage[] {
  return getRelatedPages({
    city,
    type: 'city',
  });
}
