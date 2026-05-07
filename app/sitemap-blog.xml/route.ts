import blogSitemap from '@/app/sitemap-blog';
import { renderSitemapXml, sitemapXmlResponse } from '@/utils/sitemapXml';

export function GET() {
  return sitemapXmlResponse(renderSitemapXml(blogSitemap()));
}
