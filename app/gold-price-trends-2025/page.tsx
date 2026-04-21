/**
 * Gold Price Trends 2025 Page
 * Scenario-based analysis for reading gold market trends
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicClusterNav from '@/components/TopicClusterNav';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
import { TrendingUp, TrendingDown, BarChart3, Calendar, AlertCircle, DollarSign } from 'lucide-react';
import { getSiteUrl } from '@/utils/siteUrl';

export const metadata: Metadata = {
  title: 'Gold Price Trends 2025: Context, Drivers & Scenarios | MetalView India',
  description: 'A practical guide to reading gold price trends in 2025: key drivers, Indian market context, and scenario-based thinking without overconfident forecasts.',
  keywords: [
    'gold price trends 2025',
    'gold rate trends 2025',
    'gold price analysis 2025',
    'gold market trends',
    'gold price outlook 2025',
  ],
  openGraph: {
    title: 'Gold Price Trends 2025: Context, Drivers & Scenarios | MetalView',
    description: 'A practical look at gold price trends in 2025, focused on drivers, Indian context, and scenario-based interpretation.',
    type: 'article',
    locale: 'en_IN',
    url: '/gold-price-trends-2025',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Trends 2025: Context, Drivers & Scenarios',
    description: 'A practical guide to interpreting gold price trends in 2025 without overconfident forecasts.',
  },
  alternates: {
    canonical: '/gold-price-trends-2025',
  },
};

export default async function GoldPriceTrends2025Page() {
  const baseUrl = getSiteUrl();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gold Price Trends 2025: Context, Drivers & Scenarios',
    description: 'A practical guide to reading gold price trends in 2025, including key drivers, Indian market context, and scenario-based thinking.',
    author: {
      '@type': 'Organization',
      name: 'MetalView India',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetalView India',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.svg`,
      },
    },
    datePublished: '2025-01-27',
    dateModified: '2026-04-10',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-50">Gold Price Trends 2025</span>
          </nav>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800">
                <BarChart3 className="w-6 h-6 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Gold Price Trends 2025
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Practical market context for Indian readers: what is moving gold, what could change next, and how to read trend talk more responsibly
                </p>
              </div>
            </div>
          </div>

          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Why This Page Avoids Single-Number Forecasts
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                Gold is one of the easiest assets to discuss dramatically and one of the hardest assets to predict cleanly. A single target price can sound confident, but it often hides the fact that gold in India moves through several layers at once: the international bullion market, the rupee-dollar exchange rate, inflation expectations, interest-rate policy, and local retail demand.
              </p>
              <p>
                That is why this page focuses on scenarios rather than prediction theatre. It is more useful to understand what would keep gold supported, what could cool prices, and how Indian buyers should interpret any move they see on a live city page.
              </p>
            </div>
          </section>

          {/* Key Highlights */}
          <section className="mb-12 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              What Matters More Than a Single Forecast
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Supportive Conditions</h3>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                    <span>Central bank buying continues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                    <span>Geopolitical uncertainties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                    <span>Inflation hedge demand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                    <span>Strong Indian demand</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Cooling Conditions</h3>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                    <span>Strong US dollar impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                    <span>Rising interest rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                    <span>Economic recovery pace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                    <span>Market volatility</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Factors Affecting Prices */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              The Main Drivers Indian Readers Should Watch
            </h2>
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  Real Yields, Inflation, and Rate Expectations
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Gold often stays supported when real yields feel less attractive and inflation or inflation anxiety remains elevated. If rate expectations shift sharply, gold can respond even before actual policy changes arrive.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  Geopolitical Stress and Safe-Haven Demand
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Gold still behaves like a fear-sensitive asset. Political shocks, conflict risk, or broad financial uncertainty can quickly increase safe-haven demand even when nothing changes in jewellery demand on the ground.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  Indian Retail Seasonality
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Indian festivals and wedding-led buying can widen local premiums, increase showroom urgency, and make the final invoice feel more expensive even when the benchmark metal chart is relatively calm.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  Rupee Movement and Market Positioning
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Indian buyers should not watch international gold alone. If the rupee weakens, local gold can feel stronger than the global chart suggests. ETF flows, central-bank behavior, and market positioning also shape short-term sentiment.
                </p>
              </div>
            </div>
          </section>

          {/* Historical Context */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              How to Read Trend Content More Usefully
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Trend pages are most useful when they help you ask better questions, not when they tempt you into fake precision. A good reading of 2025 should ask:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Is the move global, local, or currency-driven?</li>
                <li>Are retail premiums widening faster than the benchmark rate?</li>
                <li>Is the article describing a scenario, or pretending to know an exact endpoint?</li>
                <li>Does the current move matter for my purchase horizon, or am I reacting to noise?</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400">
                That mindset is especially valuable in India, where the number that matters to a family buying jewellery may differ from the number that matters to a long-term investor or a reader comparing city benchmarks.
              </p>
            </div>
          </section>

          {/* Investment Outlook */}
          <section className="mb-12 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Practical Takeaway for Readers
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                <strong>Use this page as context, not as a buy or sell signal.</strong> The most useful 2025 stance for most readers is:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>track live rates alongside the broader market story,</li>
                <li>separate benchmark movement from final retail cost,</li>
                <li>avoid making large decisions from one dramatic forecast, and</li>
                <li>treat gold as part of a broader financial or purchasing plan rather than as a short-term prediction game.</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400">
                Readers who want more than headlines should combine this trend context with live city pages, purity guides, and a realistic understanding of taxes, making charges, and timing pressure.
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Related Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/gold-vs-silver-investment"
                className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">
                  Gold vs Silver Investment
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Compare investment options
                </p>
              </Link>
              <Link
                href="/best-cities-to-buy-gold"
                className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-950/30 transition-colors"
              >
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Best Cities to Buy Gold
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Find the best prices
                </p>
              </Link>
            </div>
          </section>

          {/* Topic Cluster Navigation */}
          <TopicClusterNav cluster="gold" />

          {/* You May Also Like Section */}
          <YouMayAlsoLike
            currentMetal="gold"
            pageType="trend"
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
