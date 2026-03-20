# SEO Improvement Recommendations for Best Google Ranking

Analysis of the MetalView India codebase with actionable suggestions for better search visibility and ranking.

---

## 1. Metadata & Titles

### Current state
- Root layout has `metadataBase`, template `%s | MetalView`, and good default title/description.
- Homepage, metal pages, city pages, and guides have unique titles and descriptions.
- Blog post metadata uses `post.excerpt` as description.

### Recommendations

| Priority | Action |
|----------|--------|
| **High** | **Metal pages** – Add `keywords` and `openGraph.images` (e.g. `/api/og?metal=gold`) for richer snippets and social sharing. ✅ Done |
| **High** | **Blog posts** – Add `alternates.canonical` and `openGraph.type: 'article'`, `openGraph.publishedTime`, `openGraph.authors` for Article rich results. ✅ Done |
| **Medium** | **Homepage** – Ensure title includes "Palladium" if you want to rank for it (currently "Gold, Silver, Copper, Platinum"). ✅ Done |
| **Medium** | **All pages** – Use relative canonicals (e.g. `canonical: \`/${metal}\``) and rely on `metadataBase` so one source of truth. ✅ Done (homepage, metal, blog) |
| **Low** | Add `robots` only where needed (e.g. noindex for thank-you or duplicate pages); leave default index,follow. |

---

## 2. Structured Data (Schema.org)

### Current state
- Organization, BreadcrumbList, FinancialProduct/Offer, WebSite, FAQ (via FAQSchema), Article (blog).
- **Fake review schema removed** – Product/SoftwareApplication no longer use `aggregateRating` or `review` (policy-safe). **VideoObject** removed (charts are not videos).

### Recommendations

| Priority | Action |
|----------|--------|
| **Critical** | **Remove or replace fake review schema** – ✅ Done (removed from StructuredData) |
| **High** | **VideoObject** – Remove misleading VideoObject for non-video content. ✅ Done (removed) |
| **High** | **Blog posts** – Article schema with datePublished, dateModified, author, publisher. ✅ Done (blog has full Article + @id) |
| **Medium** | **WebSite** – potentialAction SearchAction already in schema; add city search UI on homepage if you want it to work. |
| **Medium** | **BreadcrumbList** – Breadcrumbs component outputs BreadcrumbList on metal, metal+city, city, guides, blog. ✅ Done |
| **Low** | **softwareHelp** – Point to existing URL instead of /help. ✅ Done (now points to /guides) |

---

## 3. Sitemap & Crawlability

### Current state
- Single `sitemap.xml` with homepage, metal hubs, guides, blog, cities, metal+city, legacy URLs.
- `robots.txt` references sitemap and disallows `/api/`, `/_next/`.

### Recommendations

| Priority | Action |
|----------|--------|
| **Done** | Sitemap includes metal hub URLs, key guides, blog slugs, city and metal+city. |
| **Medium** | **Manual (GSC):** Submit sitemap and request indexing for key URLs (see list below). |
| **Low** | If sitemap grows beyond ~50k URLs, split into a sitemap index; see comment in `app/sitemap.ts`. |

### Key URLs to submit in Google Search Console

After adding the property for `metalview.in`, submit the sitemap and use “Request indexing” for these priority URLs:

1. `https://metalview.in/` (homepage)
2. `https://metalview.in/gold`
3. `https://metalview.in/silver`
4. `https://metalview.in/guides`
5. `https://metalview.in/about`
6. `https://metalview.in/blog`
7. `https://metalview.in/city/mumbai`
8. `https://metalview.in/city/delhi`
9. `https://metalview.in/gold/price-in/mumbai`

**Sitemap URL:** `https://metalview.in/sitemap.xml` (add in GSC → Sitemaps).

---

## 4. Content & On-Page SEO

### Current state
- Metal pages: Visible H1, H2s, FAQ blocks, “People also ask,” internal links to metals, cities, and guides.
- Guides and blog have clear headings and body content. Blog posts include a "Check live metal prices" CTA with links to /, /gold, /silver, /guides.
- City and metal+city pages have unique copy. Last updated is shown via LastUpdated component on metal pages.

### Recommendations

| Priority | Action |
|----------|--------|
| **High** | **Single visible H1 per page** – Metal pages now have a visible H1 matching the main title. Done  |
| **Medium** | **Internal linking** – Metal pages link to relevant guides; blog posts have a CTA block to /, /gold, /silver, /guides. Done |
| **Medium** | **Content length** – Key landing pages have SEO blocks and FAQs (300+ words when combined). |
| **Low** | **Last updated** – Shown via LastUpdated component on metal pages. Done |

---

## 5. Technical & Performance

### Current state
- Next.js 14 with App Router, `metadataBase`, dynamic metadata.
- Font `display: swap`, image formats (WebP/AVIF), `optimizePackageImports` for tree-shaking.
- **LCP:** `/og-image.svg` is preloaded in layout. **Charts:** ChartSection is lazy-loaded (`dynamic`, ssr: false). **Mobile:** viewport and theme-color set in layout.
- Some pages use client-side data fetching (metal page), others use server/ISR (city, metal+city).

### Recommendations

| Priority | Action |
|----------|--------|
| **High** | **LCP** – Preload critical image. Done (layout has preload for /og-image.svg) |
| **Medium** | **Core Web Vitals** – Monitor LCP, INP, CLS in GSC; charts are already lazy-loaded. Fix any poor URLs if reported. |
| **Medium** | **Mobile** – Run Google Mobile-Friendly Test and fix any issues; nav and tap targets already improved. |
| **Low** | **theme-color and viewport** – Already set in layout. Done |

---

## 6. URL & Canonical

### Current state
- Clean URLs: `/{metal}`, `/{metal}/price-in/{city}`, `/city/{city}`, `/blog`, `/blog/{slug}`, `/guides`, etc.
- **Legacy:** `gold-price-today-in-{city}` 301 redirects to `/gold/price-in/{city}` in `next.config.js`. Legacy page metadata already sets canonical to the new URL via `generateMetalMetadata`.

### Recommendations

| Priority | Action |
|----------|--------|
| **Medium** | Legacy URL canonical + 301. Done (redirect in next.config.js; canonical set via generateMetalMetadata on legacy page) |
| **Low** | Trailing-slash policy. Keeping Next.js default (no trailing slash); no config change. Done |

---

## 7. Blog & Guides

### Current state
- Blog index and 25 posts; guides hub and 7 guide pages.
- Article schema and HowTo schema on blog.
- **Metadata:** Blog post pages have canonical, openGraph.images (`/api/og?title=...`), publishedTime, and Article JSON-LD with datePublished/dateModified.
- **Next 15:** `params` is typed as `Promise<{ slug: string }>` and awaited in both `generateMetadata` and the page component.
- **Related:** Each post has a "Related posts" block (up to 3 same-category/other posts) and a "Related guides" link at the bottom.

### Recommendations

| Priority | Action |
|----------|--------|
| **High** | **Blog post metadata.** Done (canonical, openGraph.images, Article datePublished/dateModified in meta + JSON-LD) |
| **Medium** | **Next 15.** Done (params awaited in generateMetadata and page) |
| **Low** | **Related posts/guides.** Done (Related posts + Related guides link at bottom of each post) |
---

## 8. Quick Wins Checklist

- [x] Remove or replace fake Product/SoftwareApplication review and rating schema.
- [x] Remove or fix VideoObject schema for non-video content.
- [x] Add OG image and canonical to metal page metadata.
- [x] Add canonical, article OG tags, and optional OG image to blog posts.
- [x] Fix `softwareHelp` URL if `/help` does not exist (e.g. point to `/guides`) – points to `/guides`.
- [x] Preload LCP image if applicable.
- [ ] Submit sitemap and request indexing for priority URLs in GSC (manual).
- [x] Add 2–3 contextual internal links from blog to metal/guide pages.

---

## 9. Further Improvements (Latest Pass)

### Implemented in this pass
- **Layout canonical** – Removed the static `<link rel="canonical" href="https://metalview.in" />` from the root layout so every page no longer gets a wrong canonical; canonicals are now driven only by per-page metadata (`alternates.canonical`) and `metadataBase`.
- **About page** – Added `keywords`, `openGraph` (title, description, type, locale, url), and `alternates.canonical: '/about'`.
- **Privacy page** – Added `openGraph` and `alternates.canonical: '/privacy-policy'`.
- **Guides** – Canonical changed from absolute URL to relative `'/guides'` for consistency with metadataBase.
- **City overview page** – `params` typed as `Promise<{ cityName: string }>` and awaited in both `generateMetadata` and the page component (Next 15–ready). Canonical set to relative `'/city/${cityName}'`.

### Optional / future (implemented)
- **Dashboard** – Done. Added `app/dashboard/layout.tsx` with metadata (title, description, openGraph, canonical) so the dashboard is indexable with a proper snippet.
- **Guide subpages** – Done. All seven guide pages now use relative canonicals and relative `openGraph.url` (e.g. `/24k-vs-22k-vs-18k-gold`); they already had OG images where needed.

### Still optional
- **WebSite schema** – Add city/search UI that uses the existing `potentialAction` SearchAction if you want sitelinks search box in results.
- **GSC** – Submit sitemap and request indexing for priority URLs (Section 8 checklist).

---

## Summary

Strongest impact:
1. **Policy-safe structured data** – Remove fabricated reviews/ratings and misleading VideoObject.
2. **Richer metadata** – OG images and canonicals on metal and blog pages.
3. **Content signals** – Visible H1, internal links from blog to metal/guides, and consistent “last updated” where relevant.
4. **Technical** – LCP preload and monitoring Core Web Vitals.

Implementing the critical and high-priority items will reduce policy risk and improve how Google interprets and ranks your pages.
