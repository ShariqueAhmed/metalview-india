import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Gem, Crown, Scale, TrendingUp } from 'lucide-react';
import { getSiteUrl } from '@/utils/siteUrl';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Platinum Price Guide: How to Read Platinum Prices in India | MetalView India',
  description:
    'Practical guide to platinum prices in India. Learn what moves platinum, how platinum differs from gold, and how to compare live platinum rates responsibly.',
  keywords: [
    'platinum price guide india',
    'platinum price india',
    'platinum rate today',
    'platinum vs gold india',
    'platinum jewellery india',
  ],
  openGraph: {
    title: 'Platinum Price Guide: How to Read Platinum Prices in India | MetalView',
    description:
      'Understand platinum prices in India, how platinum differs from gold, and how to use live platinum rates responsibly.',
    type: 'article',
    locale: 'en_IN',
    url: `${SITE_URL}/platinum-price-guide`,
  },
  alternates: {
    canonical: '/platinum-price-guide',
  },
};

export default function PlatinumPriceGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Platinum Price Guide: How to Read Platinum Prices in India',
    description:
      'Guide to platinum prices in India, covering jewellery context, market drivers, and how platinum differs from gold for Indian readers.',
    author: {
      '@type': 'Organization',
      name: 'MetalView India',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetalView India',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.svg`,
      },
    },
    datePublished: '2026-04-30',
    dateModified: '2026-04-30',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Platinum Price Guide', href: '/platinum-price-guide' },
            ]}
          />

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 flex items-center justify-center border-2 border-sky-200 dark:border-sky-800">
                <Gem className="w-6 h-6 text-sky-700 dark:text-sky-400" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Platinum Price Guide
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  How to understand platinum prices in India and compare them with gold more carefully
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                  Reviewed on April 30, 2026 by the MetalView editorial team
                </p>
              </div>
            </div>
          </header>

          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Platinum Is a Niche Choice, Not Just an Alternate Gold Rate
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Platinum often enters the conversation when readers want something rarer-feeling than gold or more design-oriented than traditional jewellery choices. But platinum should not be read as a simple substitute for gold. The price benchmark matters, yet availability, fabrication, purity standards, and the way stores position platinum products can all have a large effect on the final bill.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                This guide is here to help you interpret the live platinum rate with the right expectations. For most Indian readers, platinum is a specialist purchase category, which means comparison discipline matters even more than it does for mainstream gold buying.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                What Usually Moves Platinum Prices
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Industrial and automotive demand</li>
                <li>Global supply constraints and mining concentration</li>
                <li>Investor sentiment in precious-metals markets</li>
                <li>Currency moves and broader commodity cycles</li>
                <li>Retail jewellery demand and product mix</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                How Platinum Differs from Gold in Practice
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Retail availability is usually narrower than gold.</li>
                <li>Fabrication and design premiums can be a bigger part of the total invoice.</li>
                <li>Shoppers are often comparing style and exclusivity, not only price.</li>
                <li>Resale expectations and liquidity should be checked more carefully than with standard gold products.</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                How to Read a Live Platinum Rate Properly
              </h3>
              <ol className="list-decimal list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Start with the live benchmark only as a reference point.</li>
                <li>Confirm weight unit, purity, and product category with the seller.</li>
                <li>Ask whether fabrication or design premium is included separately.</li>
                <li>Compare the full bill against a gold alternative if you are making a trade-off decision.</li>
                <li>Think about resale practicality before buying only for novelty.</li>
              </ol>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                Who This Guide Helps Most
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-0">
                This page is most useful if you are comparing platinum with gold for jewellery, trying to understand whether today&apos;s live platinum rate is unusually strong or weak, or simply want a clearer framework before visiting a platinum-focused retailer.
              </p>
            </div>
          </section>

          <section className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/platinum" className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-800 transition-all duration-200 card-shadow hover:card-shadow-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center group-hover:bg-sky-200 dark:group-hover:bg-sky-900/50 transition-colors">
                  <TrendingUp className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  Live Platinum Prices
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Track live platinum rates and compare city-level benchmark pages.</p>
            </Link>

            <Link href="/blog/platinum-palladium-prices-india-guide" className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-800 transition-all duration-200 card-shadow hover:card-shadow-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Crown className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Platinum &amp; Palladium Article
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Read the editorial article that explains how both niche metals are quoted in India.</p>
            </Link>

            <Link href="/investment-guide" className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-800 transition-all duration-200 card-shadow hover:card-shadow-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Scale className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                  Investment Context
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">See where platinum fits compared with gold and silver in a broader metal-allocation conversation.</p>
            </Link>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Next Steps
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              <Link href="/gold-vs-silver-investment" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Compare mainstream options</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">If platinum is being considered against gold, start with the more common gold-vs-silver baseline too.</p>
              </Link>
              <Link href="/guides" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Guides hub</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Browse the wider editorial support content around live metal prices.</p>
              </Link>
              <Link href="/about" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Methodology</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Review how MetalView sources and updates benchmark rates.</p>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
