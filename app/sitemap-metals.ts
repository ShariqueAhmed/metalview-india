/**
 * Metals Sitemap
 * Contains only high-level metal hub pages. City detail routes are available
 * for users but intentionally excluded from sitemap targets for now.
 */

import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/utils/siteUrl';
import { SITEMAP_METALS } from '@/utils/sitemapConstants';

const METALS = [...SITEMAP_METALS];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  return METALS.map((metal) => ({
    url: `${baseUrl}/${metal}`,
    lastModified: now,
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }));
}
