import metalsSitemap from '@/app/sitemap-metals';
import { renderSitemapXml, sitemapXmlResponse } from '@/utils/sitemapXml';

export async function GET() {
  return sitemapXmlResponse(renderSitemapXml(await metalsSitemap()));
}
