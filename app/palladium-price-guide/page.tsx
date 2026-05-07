import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Gem, Factory, TrendingUp, Scale } from 'lucide-react';
import { getSiteUrl } from '@/utils/siteUrl';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Palladium Price Guide: How to Understand Palladium Prices in India | MetalView India',
  description:
    'Learn how palladium prices work in India, why palladium is mostly an industrial context metal, and how to interpret live palladium rates responsibly.',
  keywords: [
    'palladium price guide india',
    'palladium price india',
    'palladium rate today',
    'palladium market india',
    'industrial precious metal india',
  ],
  openGraph: {
    title: 'Palladium Price Guide: How to Understand Palladium Prices in India | MetalView',
    description:
      'Practical guide to palladium prices in India, including industrial context, benchmark use, and caution around retail interpretation.',
    type: 'article',
    locale: 'en_IN',
    url: `${SITE_URL}/palladium-price-guide`,
  },
  alternates: {
    canonical: '/palladium-price-guide',
  },
};

export default function PalladiumPriceGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Palladium Price Guide: How to Understand Palladium Prices in India',
    description:
      'Guide to palladium prices in India, focused on industrial context, live benchmark interpretation, and the limits of mainstream retail relevance.',
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
              { label: 'Palladium Price Guide', href: '/palladium-price-guide' },
            ]}
          />

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 flex items-center justify-center border-2 border-violet-200 dark:border-violet-800">
                <Gem className="w-6 h-6 text-violet-700 dark:text-violet-400" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Palladium Price Guide
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  How to understand palladium prices in India without over-reading a niche benchmark
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
                Palladium Is Mostly a Context Metal for Indian Readers
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Palladium is a precious metal, but it is not a mainstream Indian retail-buying category in the way gold and silver are. For most readers, the useful role of a palladium page is to provide market context: what is happening in a niche industrial metal, how it compares with platinum, and whether unusual moves reflect broader commodity conditions.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                If you ever receive a real palladium quote, you should be even more careful than usual. Availability can be thin, unit conventions may vary, and liquidity expectations may not resemble those of more familiar metals.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                What Usually Moves Palladium Prices
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Industrial and automotive demand cycles</li>
                <li>Supply concentration and mining disruption risk</li>
                <li>Substitution trends involving platinum and other industrial metals</li>
                <li>Global commodity sentiment and speculative positioning</li>
                <li>Currency effects and broader risk appetite</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                How to Use a Live Palladium Benchmark Properly
              </h3>
              <ol className="list-decimal list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Treat the live rate as a reference number, not an offer to transact.</li>
                <li>Confirm exact unit, taxes, and seller credibility if a real quote appears.</li>
                <li>Check whether the quote is meaningful for retail access or only for specialist channels.</li>
                <li>Compare palladium with platinum if you are trying to interpret relative pricing moves.</li>
                <li>Remember that liquidity and resale can matter more than the benchmark itself.</li>
              </ol>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                Common Mistakes with Palladium Pages
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Assuming palladium behaves like a regular jewellery-buying metal.</li>
                <li>Confusing a niche benchmark with a practical mainstream retail opportunity.</li>
                <li>Ignoring liquidity, access, and resale risk while focusing only on the chart.</li>
                <li>Reading short-term spikes without checking industrial demand context.</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                When This Guide Helps Most
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-0">
                Use this page when you want to understand what a live palladium rate is telling you, why palladium is relevant to the wider precious-metals conversation, and how to avoid overconfidence when reading a niche industrial benchmark.
              </p>
            </div>
          </section>

          <section className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/palladium" className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-800 transition-all duration-200 card-shadow hover:card-shadow-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center group-hover:bg-violet-200 dark:group-hover:bg-violet-900/50 transition-colors">
                  <TrendingUp className="w-5 h-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  Live Palladium Prices
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Track live palladium rates and compare city-level reference pages.</p>
            </Link>

            <Link href="/blog/platinum-palladium-prices-india-guide" className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-800 transition-all duration-200 card-shadow hover:card-shadow-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900/30 flex items-center justify-center group-hover:bg-fuchsia-200 dark:group-hover:bg-fuchsia-900/50 transition-colors">
                  <Factory className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                  Platinum &amp; Palladium Article
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Read the related editorial explainer for both niche precious metals.</p>
            </Link>

            <Link href="/investment-guide" className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-800 transition-all duration-200 card-shadow hover:card-shadow-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Scale className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                  Investment Context
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">See why palladium is usually a specialist context metal rather than a default retail holding.</p>
            </Link>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Next Steps
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              <Link href="/platinum-price-guide" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Compare with platinum</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Use the platinum guide to understand the closest adjacent niche-metal context.</p>
              </Link>
              <Link href="/guides" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Guides hub</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Browse the broader library of support content around live prices and buying decisions.</p>
              </Link>
              <Link href="/about" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Methodology</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Review how MetalView sources and refreshes benchmark rates.</p>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
