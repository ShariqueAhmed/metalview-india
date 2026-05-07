import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Zap, Factory, TrendingUp, Scale } from 'lucide-react';
import { getSiteUrl } from '@/utils/siteUrl';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Copper Price Guide: How Copper Prices Work in India | MetalView India',
  description:
    'Understand copper prices in India, what drives them, how industrial demand changes copper benchmarks, and how to use live copper rates responsibly.',
  keywords: [
    'copper price guide india',
    'copper price india',
    'copper rate today',
    'how copper prices work',
    'industrial metal prices india',
    'copper demand india',
  ],
  openGraph: {
    title: 'Copper Price Guide: How Copper Prices Work in India | MetalView',
    description:
      'Practical guide to copper prices in India, including demand drivers, benchmark use, and how to interpret live copper rates.',
    type: 'article',
    locale: 'en_IN',
    url: `${SITE_URL}/copper-price-guide`,
  },
  alternates: {
    canonical: '/copper-price-guide',
  },
};

export default function CopperPriceGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Copper Price Guide: How Copper Prices Work in India',
    description:
      'Practical guide to reading copper prices in India, including industrial demand drivers, benchmark use, and the limits of retail interpretation.',
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
              { label: 'Copper Price Guide', href: '/copper-price-guide' },
            ]}
          />

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center border-2 border-orange-200 dark:border-orange-800">
                <Zap className="w-6 h-6 text-orange-700 dark:text-orange-400" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Copper Price Guide
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  How copper prices work in India and how to use live benchmarks responsibly
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
                Copper Is a Market Signal First, a Retail Price Second
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Copper is often called a &quot;doctor&quot; metal because traders watch it for clues about industrial activity, construction, power demand, and manufacturing sentiment. That makes copper very different from gold and silver. Most readers should treat live copper rates as a market benchmark, not as a straightforward consumer shelf price.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                In India, copper relevance often shows up in business planning, procurement context, and commodity awareness. If you are sourcing copper for a project, actual delivered cost will depend on grade, quantity, taxes, transport, and contract terms, not just the headline number on a chart.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                What Usually Moves Copper Prices
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Construction and infrastructure demand</li>
                <li>Power, transmission, and renewable-energy expansion</li>
                <li>Global manufacturing and export sentiment</li>
                <li>Chinese demand and international commodity cycles</li>
                <li>Dollar strength, financing conditions, and speculative flows</li>
                <li>Supply disruptions in mining, refining, and shipping</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                How to Use a Live Copper Benchmark Properly
              </h3>
              <ol className="list-decimal list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Use the displayed rate as a directional benchmark, not a final payable quote.</li>
                <li>Confirm the exact copper grade, unit basis, and quantity with the supplier.</li>
                <li>Ask how logistics, taxes, delivery, and credit terms affect the total cost.</li>
                <li>Compare multiple supplier quotes if copper is procurement-critical.</li>
                <li>Read the trend as context for planning rather than a precise forecast.</li>
              </ol>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                Common Interpretation Mistakes
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Assuming a benchmark copper rate equals the final invoiced business cost.</li>
                <li>Ignoring grade and contract differences when comparing quotes.</li>
                <li>Reading copper like a jewellery-buying metal instead of an industrial benchmark.</li>
                <li>Overreacting to daily volatility without checking broader industrial context.</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                When This Guide Helps Most
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-0">
                Use this guide when you want to understand why copper is moving, whether today&apos;s benchmark looks relevant to business decisions, and how to compare live copper pages with actual supplier quotes more carefully.
              </p>
            </div>
          </section>

          <section className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/copper" className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-800 transition-all duration-200 card-shadow hover:card-shadow-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                  <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  Live Copper Prices
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Switch cities and follow live copper benchmarks across India.</p>
            </Link>

            <Link href="/blog/copper-price-india-guide-industrial-demand" className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-800 transition-all duration-200 card-shadow hover:card-shadow-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
                  <Factory className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Copper Demand Article
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Read the market-analysis version focused on why copper matters beyond the headline rate.</p>
            </Link>

            <Link href="/investment-guide" className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-800 transition-all duration-200 card-shadow hover:card-shadow-hover group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Scale className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                  Investment Context
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">See where copper sits relative to gold and silver in a broader metal-tracking context.</p>
            </Link>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Where to Go Next
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              <Link href="/cities" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">City index</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Compare copper with other metals on city overview pages.</p>
              </Link>
              <Link href="/guides" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Guides hub</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Browse supporting explainers for silver, platinum, palladium, and investment use cases.</p>
              </Link>
              <Link href="/about" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Methodology</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">See how MetalView sources and refreshes benchmark metal prices.</p>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
