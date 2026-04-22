/**
 * Blog slugs + dates for sitemap.xml and sitemap-blog.xml.
 * Derived from utils/blogIndexPosts.ts (same URLs as /blog). Add new posts there.
 */
import { blogIndexPosts } from './blogIndexPosts';

export const BLOG_SITEMAP_ENTRIES: { slug: string; date: string }[] = blogIndexPosts.map(
  ({ slug, date }) => ({ slug, date })
);
