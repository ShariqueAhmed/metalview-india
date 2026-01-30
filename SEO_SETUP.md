# SEO Setup Guide

## 1. Google Search Console Verification

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (website URL)
3. Choose "HTML tag" verification method
4. Copy the verification code (the content value from the meta tag)
5. Add it to your `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code-here
```

6. Restart your development server

## 2. OG Image

An SVG OG image has been created at `/public/og-image.svg`. 

**Optional:** For better compatibility, you can convert it to PNG:
- Use an online tool like [CloudConvert](https://cloudconvert.com/svg-to-png)
- Set dimensions to 1200x630px
- Save as `/public/og-image.png`
- Update `app/layout.tsx` to reference `/og-image.png` instead of `/og-image.svg`

## 3. City-Specific Pages

City-specific pages are automatically generated at `/city/[cityName]`. 

**Features:**
- SEO-optimized metadata for each city
- Dynamic routes for all trending cities
- Links from trending cities section
- Structured data for each city page

**Example URLs:**
- `/city/delhi`
- `/city/mumbai`
- `/city/bangalore`

## 4. Blog Section

A blog section has been created at `/blog` with sample posts.

**Current Blog Posts:**
1. Understanding Gold Purity: 24K vs 22K
2. Gold Price Trends 2025
3. Best Time to Buy Gold
4. Gold Investment vs Jewelry

**To Add More Posts:**
1. Edit `/app/blog/[slug]/page.tsx`
2. Add new post to the `blogPosts` object
3. Add corresponding entry to `/app/blog/page.tsx` posts array

## 5. Sitemap

The sitemap is automatically generated at `/sitemap.xml` and includes:
- Homepage
- Blog page
- All city pages

## 6. Robots.txt

Robots.txt is configured at `/public/robots.txt` to allow all search engines.

## Next Steps

1. **Set up Google Search Console** - Add your verification code
2. **Submit sitemap** - In Google Search Console, submit `https://metalview.in/sitemap.xml`
3. **Create OG image** - Convert SVG to PNG for better compatibility (optional)
4. **Add more blog content** - Create more blog posts for better SEO
5. **Monitor performance** - Use Google Search Console to track your SEO performance

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
```
