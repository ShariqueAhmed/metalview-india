/**
 * Site author / E-E-A-T configuration.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  ⚠️  ACTION REQUIRED (this is the highest-impact AdSense fix)
 * ─────────────────────────────────────────────────────────────────────────
 *  Gold/silver prices are "Your Money or Your Life" (YMYL) content, so Google
 *  wants a REAL, verifiable person behind the editorial work — not an
 *  anonymous "Editorial Desk".
 *
 *  To activate a named author across the site:
 *    1. Fill in `name`, `role`, `bio`, and `credentials` below with REAL,
 *       truthful details about whoever actually runs / writes for metalview.in.
 *       ("Long-time gold investor", "jewellery-trade background", etc. all count —
 *       it does not need to be a formal finance qualification, just true.)
 *    2. Add at least one PUBLIC profile URL to `sameAs` (LinkedIn is ideal) so
 *       Google can verify the person is real. This is what makes it work.
 *    3. Set `isRealPerson: true`.
 *
 *  Until `isRealPerson` is true, the site keeps showing the honest existing
 *  "MetalView Editorial Desk" label — we never publish a fabricated identity,
 *  because a fake author hurts YMYL approval more than an anonymous one.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface SiteAuthor {
  /** Set true ONLY after the fields below hold real, verifiable details. */
  isRealPerson: boolean;
  /** URL slug for the author page, e.g. "mohsin-ansari". */
  slug: string;
  /** Public display name. Use your real name or a consistent public pen name. */
  name: string;
  /** Short role, e.g. "Founder & Editor, MetalView India". */
  role: string;
  /** 2–4 sentence first-person-credible bio. Must be truthful. */
  bio: string;
  /** Real, truthful expertise/experience bullets. Keep honest and specific. */
  credentials: string[];
  /** Public contact email shown on the author page (optional). */
  email?: string;
  /** PUBLIC profiles for verification (LinkedIn, X, personal site). REQUIRED for the signal to count. */
  sameAs: string[];
}

/**
 * The primary editorial author. EDIT THIS with real details, then flip
 * `isRealPerson` to true. See the header comment above.
 */
export const PRIMARY_AUTHOR: SiteAuthor = {
  isRealPerson: true,
  slug: 'sharique-ansari',
  name: 'Sharique Ansari',
  role: 'Founder & Editor, MetalView India',
  bio:
    'Sharique Ansari is the founder and editor of MetalView India. A senior software developer by ' +
    'profession, he has followed Indian gold and silver prices for over six years and built MetalView to ' +
    'make benchmark metal rates easier for everyday buyers to read and interpret. He writes and reviews ' +
    'the site’s guides with a focus on turning raw price data into practical, plain-English context — ' +
    'MetalView publishes reference information, not financial advice.',
  credentials: [
    'Over 6 years following Indian gold and silver prices',
    'Senior software developer with a professional background in software engineering',
    'Founder of MetalView India, focused on price transparency and plain-English explainers',
  ],
  email: 'metalviewofficial@gmail.com',
  sameAs: [
    'https://www.instagram.com/shariahscan/',
  ],
};

/** Fallback used until a real person is configured — honest, non-fabricated. */
export const EDITORIAL_ORG_NAME = 'MetalView Editorial Desk';
export const REVIEW_ORG_NAME = 'MetalView Research Desk';

/**
 * Shown as the "Updated" date on guide bylines. Update this whenever you next
 * review the site's guide content so the date stays truthful.
 */
export const LAST_REVIEWED = '2026-08-27';

/** True when the primary author has been filled in with real, verifiable details. */
export function hasNamedAuthor(): boolean {
  return (
    PRIMARY_AUTHOR.isRealPerson &&
    !PRIMARY_AUTHOR.name.startsWith('REPLACE') &&
    PRIMARY_AUTHOR.sameAs.length > 0
  );
}

/** Display name for the "Written by" byline (named person if configured, else honest org label). */
export function getBylineName(): string {
  return hasNamedAuthor() ? PRIMARY_AUTHOR.name : EDITORIAL_ORG_NAME;
}

/**
 * schema.org `author` node. Uses a verifiable Person when configured,
 * otherwise falls back to the Organization (never a fabricated Person).
 */
export function getAuthorSchema(baseUrl: string): Record<string, unknown> {
  if (hasNamedAuthor()) {
    return {
      '@type': 'Person',
      name: PRIMARY_AUTHOR.name,
      jobTitle: PRIMARY_AUTHOR.role,
      description: PRIMARY_AUTHOR.bio,
      url: `${baseUrl}/author/${PRIMARY_AUTHOR.slug}`,
      sameAs: PRIMARY_AUTHOR.sameAs,
    };
  }
  return {
    '@type': 'Organization',
    name: EDITORIAL_ORG_NAME,
    url: baseUrl,
  };
}
