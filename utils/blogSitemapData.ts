/**
 * Blog slugs + dates for sitemap.xml and sitemap-blog.xml.
 * Only indexable posts are submitted (city template posts are excluded).
 */
import { indexableBlogPosts } from './blogIndexPosts';

export const BLOG_SITEMAP_ENTRIES: { slug: string; date: string }[] = indexableBlogPosts.map(
  ({ slug, date }) => ({ slug, date })
);
