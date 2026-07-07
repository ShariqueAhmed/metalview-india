/**
 * Legacy cities sitemap.
 * City/detail pages are kept available for users but intentionally removed from
 * submitted sitemap targets during AdSense approval hardening.
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
