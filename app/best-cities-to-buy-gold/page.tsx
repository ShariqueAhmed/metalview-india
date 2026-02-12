/**
 * Best Cities to Buy Gold Page
 * Guide to finding the best gold prices across India
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicClusterNav from '@/components/TopicClusterNav';
import { MapPin, TrendingDown, Award, DollarSign, Shield } from 'lucide-react';
import { formatCityName } from '@/utils/conversions';

export const metadata: Metadata = {
  title: 'Best Cities to Buy Gold in India 2025: Price Comparison Guide | MetalView',
  description: 'Find the best cities to buy gold in India. Compare gold prices across Mumbai, Delhi, Bangalore, and other major cities. Get expert tips on where to buy gold at the best rates.',
  keywords: [
    'best cities to buy gold',
    'cheapest gold price in india',
    'best city for gold purchase',
    'gold price comparison cities',
    'where to buy gold cheapest',
    'gold prices by city india',
    'best gold rates in india',
  ],
  openGraph: {
    title: 'Best Cities to Buy Gold in India 2025 | MetalView',
    description: 'Compare gold prices across major Indian cities and find the best rates.',
    type: 'article',
    locale: 'en_IN',
    url: 'https://metalview.in/best-cities-to-buy-gold',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cities to Buy Gold in India',
    description: 'Compare gold prices and find the best rates across major cities.',
  },
  alternates: {
    canonical: 'https://metalview.in/best-cities-to-buy-gold',
  },
};

const TOP_CITIES = [
  'mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai',
  'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'surat',
];

const CITY_RANKINGS = [
  { city: 'mumbai', rank: 1, reason: 'Largest trading hub with direct import connections' },
  { city: 'delhi', rank: 2, reason: 'Major trading center with competitive prices' },
  { city: 'bangalore', rank: 3, reason: 'Growing market with good dealer networks' },
  { city: 'kolkata', rank: 4, reason: 'Historic markets with established dealers' },
  { city: 'chennai', rank: 5, reason: 'Traditional markets with competitive pricing' },
];

export default function BestCitiesToBuyGoldPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Cities to Buy Gold in India 2025: Price Comparison Guide',
    description: 'Comprehensive guide to finding the best gold prices across major Indian cities, including price comparisons, market insights, and buying tips.',
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
            <span className="text-slate-900 dark:text-slate-50">Best Cities to Buy Gold</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Best Cities to Buy Gold in India 2025
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Compare gold prices across major Indian cities and find the best rates. Get expert insights on where to buy gold for the best value.
            </p>
          </div>

          {/* Top Cities Ranking */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Top 5 Cities for Gold Prices
            </h2>
            <div className="space-y-4">
              {CITY_RANKINGS.map((item) => (
                <div
                  key={item.city}
                  className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800 flex-shrink-0">
                    <span className="text-lg font-bold text-amber-700 dark:text-amber-400">
                      #{item.rank}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                      <Link
                        href={`/city/${item.city}`}
                        className="text-xl font-semibold text-slate-900 dark:text-slate-50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                      >
                        {formatCityName(item.city)}
                      </Link>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{item.reason}</p>
                    <Link
                      href={`/gold/price-in/${item.city}`}
                      className="inline-block mt-2 text-sm text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium"
                    >
                      View Gold Prices →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Factors Affecting Prices */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Factors Affecting Gold Prices by City
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">Lower Prices</h3>
                </div>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-8">
                  <li>• Major trading hubs (Mumbai, Delhi)</li>
                  <li>• Direct import connections</li>
                  <li>• High trading volumes</li>
                  <li>• Lower dealer margins</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">Higher Prices</h3>
                </div>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-8">
                  <li>• Smaller cities</li>
                  <li>• Transportation costs</li>
                  <li>• Higher dealer margins</li>
                  <li>• Lower trading volumes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Buying Tips */}
          <section className="mb-12 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Tips for Buying Gold
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Verify Purity</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Always check for BIS hallmark and get proper documentation. Verify purity certificates before purchase.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-6 h-6 text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Compare Prices</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Check prices across multiple dealers. Major cities often have better rates due to competition.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Choose Certified Dealers</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Buy from certified and reputed dealers. Established markets like Zaveri Bazaar (Mumbai) or Chandni Chowk (Delhi) are reliable.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Consider Location</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Major trading hubs offer better prices. If you're in a smaller city, consider traveling to nearby major cities for better rates.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* All Cities Grid */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Compare Gold Prices by City
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {TOP_CITIES.map((city) => (
                <Link
                  key={city}
                  href={`/city/${city}`}
                  className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-center"
                >
                  <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                    {formatCityName(city)}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    View Prices
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Related Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/24k-vs-22k-vs-18k-gold"
                className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-950/30 transition-colors"
              >
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  24K vs 22K vs 18K Gold
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Compare gold purities
                </p>
              </Link>
              <Link
                href="/gold-price-trends-2025"
                className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">
                  Gold Price Trends 2025
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Analyze price trends
                </p>
              </Link>
            </div>
          </section>

          {/* Topic Cluster Navigation */}
          <TopicClusterNav cluster="gold" />
        </main>
        <Footer />
      </div>
    </>
  );
}
