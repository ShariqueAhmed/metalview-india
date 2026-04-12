/**
 * Single source of truth for sitemap URL generators (app/sitemap*.ts).
 * Keep TOP_CITIES aligned with primary SEO city targets.
 */

export const SITEMAP_TOP_CITIES = [
  'mumbai',
  'delhi',
  'bangalore',
  'kolkata',
  'chennai',
  'hyderabad',
  'pune',
  'ahmedabad',
  'jaipur',
  'surat',
  'lucknow',
  'kanpur',
  'nagpur',
  'indore',
  'thane',
  'bhopal',
  'visakhapatnam',
  'patna',
  'vadodara',
  'ghaziabad',
  'coimbatore',
  'agra',
  'madurai',
  'nashik',
  'meerut',
  'rajkot',
  'varanasi',
  'srinagar',
  'amritsar',
  'jodhpur',
] as const;

export const SITEMAP_METALS = ['gold', 'silver', 'copper', 'platinum', 'palladium'] as const;

/** Guide routes that exist under app/ (see /guides for the index). */
export const SITEMAP_GUIDE_SLUGS = [
  'gold-price-guide',
  'silver-investment-guide',
  'investment-guide',
  'gold-vs-silver-investment',
  '24k-vs-22k-vs-18k-gold',
  'gold-price-trends-2025',
  'best-cities-to-buy-gold',
] as const;
