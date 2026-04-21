import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MapPin, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { formatCityName } from '@/utils/conversions';
import { getSiteUrl } from '@/utils/siteUrl';
import { SITEMAP_TOP_CITIES } from '@/utils/sitemapConstants';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Metal Prices by City in India | MetalView',
  description:
    'Browse live gold, silver, copper, platinum, and palladium price pages for major Indian cities. Compare indicative local rates and verify final quotes before buying.',
  openGraph: {
    title: 'Metal Prices by City in India | MetalView',
    description:
      'City-wise metal price pages for gold, silver, copper, platinum, and palladium across India.',
    type: 'website',
    locale: 'en_IN',
    url: `${SITE_URL}/cities`,
  },
  alternates: {
    canonical: '/cities',
  },
};

const FEATURED_METALS = ['gold', 'silver', 'copper', 'platinum', 'palladium'] as const;

export default function CitiesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Metal Prices by City in India',
    description:
      'Browse city-wise live metal price pages for gold, silver, copper, platinum, and palladium in India.',
    url: `${SITE_URL}/cities`,
    publisher: {
      '@type': 'Organization',
      name: 'MetalView India',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cities', href: '/cities' },
            ]}
          />

          <section className="content-card p-6 sm:p-8 lg:p-10 mb-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800 dark:border-amber-800/60 dark:bg-amber-900/20 dark:text-amber-200 mb-4">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  City-wise live rates
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                  Metal Prices by City in India
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Use this city index to reach local pages for gold, silver, copper, platinum, and palladium prices. Rates are indicative market references, so compare them with purity, making charges, GST, dealer premiums, and final invoice terms before making a purchase.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                  <RefreshCw className="h-5 w-5 text-amber-600 dark:text-amber-400 mb-2" aria-hidden="true" />
                  <p className="font-semibold text-slate-900 dark:text-slate-50">Updated references</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">City pages show latest available market data and timestamps where available.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mb-2" aria-hidden="true" />
                  <p className="font-semibold text-slate-900 dark:text-slate-50">Buyer-first context</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Each page explains how to read rates responsibly before visiting sellers.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SITEMAP_TOP_CITIES.map((city) => {
              const cityName = formatCityName(city);

              return (
                <article
                  key={city}
                  className="content-card p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                        {cityName}
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Live city overview plus metal-specific price pages.
                      </p>
                    </div>
                    <Link
                      href={`/city/${city}`}
                      className="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-amber-300"
                    >
                      View
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {FEATURED_METALS.map((metal) => (
                      <Link
                        key={metal}
                        href={`/${metal}/price-in/${city}`}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-sm font-medium capitalize text-slate-700 hover:border-amber-300 hover:text-amber-700 dark:border-slate-800 dark:text-slate-300 dark:hover:border-amber-700 dark:hover:text-amber-300"
                      >
                        {metal}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
