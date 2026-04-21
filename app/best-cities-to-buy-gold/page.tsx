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
import { getSiteUrl } from '@/utils/siteUrl';

export const metadata: Metadata = {
  title: 'Best Cities to Buy Gold in India: A Practical Price Comparison Guide | MetalView',
  description: 'A practical guide to comparing gold prices across Indian cities, including benchmark rates, local premiums, and how to judge the full invoice instead of the headline quote.',
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
    title: 'Best Cities to Buy Gold in India | MetalView',
    description: 'Compare benchmark gold rates across major Indian cities and learn how city-level pricing really works.',
    type: 'article',
    locale: 'en_IN',
    url: '/best-cities-to-buy-gold',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cities to Buy Gold in India',
    description: 'Understand benchmark rates, city premiums, and how to compare gold quotes more fairly.',
  },
  alternates: {
    canonical: '/best-cities-to-buy-gold',
  },
};

const TOP_CITIES = [
  'mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai',
  'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'surat',
];

const CITY_RANKINGS = [
  { city: 'mumbai', rank: 1, reason: 'Often used as a benchmark because trading depth, wholesale activity, and competition are unusually strong.' },
  { city: 'delhi', rank: 2, reason: 'Large organised and traditional retail markets make side-by-side quote comparison easier for buyers.' },
  { city: 'bangalore', rank: 3, reason: 'Digitally aware consumers and branded competition help keep pricing more transparent than in many smaller markets.' },
  { city: 'kolkata', rank: 4, reason: 'Deep jewellery tradition and long-running dealer networks make it important for comparing craftsmanship and premium structure.' },
  { city: 'chennai', rank: 5, reason: 'Heavy jewellery demand and dense showroom competition make it a key market for understanding retail premiums.' },
];

export default function BestCitiesToBuyGoldPage() {
  const baseUrl = getSiteUrl();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Cities to Buy Gold in India: A Practical Price Comparison Guide',
    description: 'A practical guide to comparing gold prices across Indian cities, including benchmark rates, local premiums, and what the final invoice can reveal.',
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
            <span className="text-slate-900 dark:text-slate-50">Best Cities to Buy Gold</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Best Cities to Buy Gold in India
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              There is no single city that is always “best” for every gold buyer. What matters is how the benchmark rate, local competition, making charges, and final invoice come together in the city where you actually buy.
            </p>
          </div>

          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Start With a Better Question
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                Many readers search for the “cheapest city to buy gold,” but that headline question hides the real decision. A benchmark gold rate may indeed look slightly lower in one city than another, especially in deep trading hubs. But the amount you actually pay can still change more because of purity, making charges, showroom premium, design complexity, and store policy.
              </p>
              <p>
                In other words, city comparison is useful, but only when you treat it as context. The smartest buyers use city rates to understand the benchmark and then compare the full invoice for the exact product they want.
              </p>
            </div>
          </section>

          {/* Top Cities Ranking */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Cities Buyers Commonly Use as Benchmarks
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              These cities matter not because they guarantee the lowest possible bill every day, but because they often make pricing easier to interpret. Their retail depth, trading connectivity, and competitive pressure can make them useful reference points for buyers elsewhere in India.
            </p>
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
              What Actually Makes One City Look Cheaper
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">Benchmark Advantages</h3>
                </div>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-8">
                  <li>• Deeper trading hubs such as Mumbai or Delhi</li>
                  <li>• Strong dealer competition and quote transparency</li>
                  <li>• Higher volumes that can compress retail margins</li>
                  <li>• Better benchmark visibility for buyers comparing rates</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">Final-Bill Distortions</h3>
                </div>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-8">
                  <li>• Higher making charges or design premiums</li>
                  <li>• Store positioning, brand premium, and urgency</li>
                  <li>• Purity mismatches between quotes</li>
                  <li>• Stones, extras, and invoice structure differences</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
              The key takeaway is that city-level benchmark differences are usually smaller than many buyers expect. The bigger gap often shows up in the final bill, not in the city rate itself.
            </p>
          </section>

          {/* Buying Tips */}
          <section className="mb-12 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              How to Use City Comparison More Intelligently
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Verify Purity</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Match purity before comparing any two offers. A 24K benchmark and a 22K jewellery quote are not directly comparable.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-6 h-6 text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Compare Prices</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Compare the full invoice across multiple sellers. Major cities may offer stronger benchmarks, but the best purchase still depends on the final payable amount.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Choose Transparency Over Hype</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    A strong market reputation helps, but it should come with hallmark clarity, written invoice breakup, and a clean explanation of making charges and buyback terms.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-amber-700 dark:text-amber-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Consider Travel Realistically</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Travelling to a bigger city makes sense only when the product value is high enough and the total savings clearly exceed travel, time, and service trade-offs.
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
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Use these city pages as benchmark tools. The goal is not to guess a winner blindly, but to see how local price context changes before you speak to a dealer.
            </p>
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
