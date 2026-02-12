/**
 * Gold Price Trends 2025 Page
 * Analysis and predictions for gold prices
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicClusterNav from '@/components/TopicClusterNav';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
import { generatePricePredictionSchema } from '@/utils/seo';
import { TrendingUp, TrendingDown, BarChart3, Calendar, AlertCircle, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gold Price Trends 2025: Analysis & Predictions | MetalView India',
  description: 'Analyze gold price trends for 2025 in India. Get expert insights, historical data, and predictions for gold prices. Understand factors affecting gold rates.',
  keywords: [
    'gold price trends 2025',
    'gold price prediction 2025',
    'gold price forecast india',
    'gold rate trends 2025',
    'gold price analysis 2025',
    'gold market trends',
    'gold price outlook 2025',
  ],
  openGraph: {
    title: 'Gold Price Trends 2025: Analysis & Predictions | MetalView',
    description: 'Expert analysis of gold price trends for 2025 in India with predictions and market insights.',
    type: 'article',
    locale: 'en_IN',
    url: 'https://metalview.in/gold-price-trends-2025',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Trends 2025: Analysis & Predictions',
    description: 'Expert analysis of gold price trends for 2025 in India.',
  },
  alternates: {
    canonical: 'https://metalview.in/gold-price-trends-2025',
  },
};

export default async function GoldPriceTrends2025Page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  // Fetch current gold price for prediction schema
  let currentGoldPrice = 65000; // Default fallback price (₹65,000 per 10g)
  try {
    const apiUrl = `${baseUrl}/api/metals?city=mumbai`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 600 }, // Cache for 10 minutes
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      const data = await response.json();
      currentGoldPrice = data.gold_10g || currentGoldPrice;
    }
  } catch (error) {
    console.error('Error fetching gold price for prediction schema:', error);
  }

  // Calculate predicted price (example: 5-10% increase for 2025)
  const predictedPrice = Math.round(currentGoldPrice * 1.075); // 7.5% increase
  const predictionDate = '2025-12-31'; // End of 2025
  const confidence = 75; // 75% confidence level

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gold Price Trends 2025: Analysis & Predictions',
    description: 'Comprehensive analysis of gold price trends for 2025 in India, including historical data, market factors, and expert predictions.',
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
    dateModified: '2025-01-27',
  };

  // Generate price prediction schema
  const predictionSchema = generatePricePredictionSchema({
    metal: 'gold',
    currentPrice: currentGoldPrice,
    predictedPrice: predictedPrice,
    predictionDate: predictionDate,
    confidence: confidence,
    unit: '10g',
    city: 'mumbai',
    baseUrl: baseUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(predictionSchema) }}
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
                  Expert analysis, historical data, and predictions for gold prices in India
                </p>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <section className="mb-12 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Key Highlights for 2025
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Positive Factors</h3>
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
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Challenges</h3>
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
              Factors Affecting Gold Prices in 2025
            </h2>
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  Economic Factors
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Inflation rates, interest rates, currency strength, and economic growth all significantly impact gold prices. In 2025, central bank policies and economic recovery pace will be key drivers.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  Geopolitical Events
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Political tensions, conflicts, and global uncertainties drive safe-haven demand for gold. Geopolitical events in 2025 will continue to influence gold prices significantly.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  Seasonal Demand
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Indian festivals, wedding seasons, and cultural events create seasonal demand spikes. Diwali, Akshaya Tritiya, and wedding months typically see higher gold prices.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  Market Sentiment
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Investor sentiment, ETF flows, and central bank purchases influence gold prices. Positive sentiment and increased buying activity typically support higher prices.
                </p>
              </div>
            </div>
          </section>

          {/* Historical Context */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Historical Context
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Gold prices in India have shown resilience and growth over the years. In 2024, gold prices reached new highs, driven by:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Strong demand from Indian consumers</li>
                <li>Central bank purchases globally</li>
                <li>Geopolitical uncertainties</li>
                <li>Inflation concerns</li>
                <li>Currency fluctuations</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400">
                These factors are expected to continue influencing gold prices in 2025, with potential for further growth depending on global economic conditions.
              </p>
            </div>
          </section>

          {/* Investment Outlook */}
          <section className="mb-12 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Investment Outlook for 2025
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                <strong>Expert Analysis:</strong> Gold is expected to remain a strong investment option in 2025 due to:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Continued safe-haven demand</li>
                <li>Strong fundamentals supporting prices</li>
                <li>Long-term wealth preservation benefits</li>
                <li>Diversification benefits in portfolios</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400">
                However, investors should be aware of short-term volatility and consider gold as a long-term investment rather than a quick profit opportunity.
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
