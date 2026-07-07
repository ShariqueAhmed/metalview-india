/**
 * Data-driven internal linking helpers.
 * Pulls from real routes/content metadata instead of sample placeholder pages.
 */

import {
  BLOG_PAGES,
  COMPARISON_PAGES,
  CONTENT_CATALOG,
  GUIDE_PAGES,
  METAL_HUB_PAGES,
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

  // AdSense hardening: recommendations only point to substantive, indexable
  // editorial pages (metal hubs, guides, comparisons, trends, blog). Thin
  // programmatic city / metal-city pages are intentionally NOT recommended so
  // that reviewers and crawlers stay on high-value content. A final filter
  // below guarantees no city / metal-city link can slip through.
  if (normalizedMetal) {
    addCatalogPages(
      related,
      METAL_HUB_PAGES.filter((page) => page.metal === normalizedMetal),
      0.9,
      { limit: 1 }
    );
    addCatalogPages(related, getSameMetalEditorialPages(normalizedMetal), 0.82, {
      excludeHref: CONTENT_CATALOG.find((page) => page.slug === currentPage.slug)?.href,
      excludeSlug: currentPage.slug,
      limit: 5,
    });
    addCatalogPages(related, getSameMetalBlogPages(normalizedMetal, currentPage.slug), 0.74, {
      limit: 3,
    });
  }

  // Always top up with evergreen, cross-topic editorial pages so the block
  // stays full even when there is no metal context.
  addCatalogPages(related, METAL_HUB_PAGES, 0.7, { limit: 3 });
  addCatalogPages(related, GUIDE_PAGES, 0.68, { excludeSlug: currentPage.slug, limit: 3 });
  addCatalogPages(related, COMPARISON_PAGES, 0.64, { excludeSlug: currentPage.slug, limit: 2 });
  addCatalogPages(related, TREND_PAGES, 0.62, { excludeSlug: currentPage.slug, limit: 2 });
  addCatalogPages(related, BLOG_PAGES, 0.58, { excludeSlug: currentPage.slug, limit: 3 });

  return related
    .filter((page) => page.type !== 'metal-city' && page.type !== 'city')
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
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
