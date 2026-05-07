import citiesSitemap from '@/app/sitemap-cities';
import { renderSitemapXml, sitemapXmlResponse } from '@/utils/sitemapXml';

export async function GET() {
  return sitemapXmlResponse(renderSitemapXml(await citiesSitemap()));
}
