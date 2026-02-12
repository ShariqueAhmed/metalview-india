/**
 * Gold Price Guide Hub Page
 * Central hub for all gold-related content
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicClusterNav from '@/components/TopicClusterNav';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Award, TrendingUp, BookOpen, DollarSign, Shield, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gold Price Guide: Complete Guide to Gold Prices, Purity & Investment | MetalView India',
  description: 'Complete guide to gold prices in India. Learn about gold purity (24K, 22K, 18K), price trends, investment strategies, and best cities to buy gold. Expert insights and real-time prices.',
  keywords: [
    'gold price guide',
    'gold price india',
    'gold purity guide',
    'gold investment guide',
    '24k vs 22k gold',
    'gold price trends',
    'best cities to buy gold',
    'gold rate today',
  ],
  openGraph: {
    title: 'Gold Price Guide: Complete Guide to Gold Prices & Investment | MetalView',
    description: 'Complete guide to gold prices, purity, and investment strategies in India.',
    type: 'article',
    locale: 'en_IN',
    url: 'https://metalview.in/gold-price-guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Guide: Complete Guide to Gold Prices & Investment',
    description: 'Learn everything about gold prices, purity, and investment in India.',
  },
  alternates: {
    canonical: 'https://metalview.in/gold-price-guide',
  },
};

export default function GoldPriceGuidePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gold Price Guide: Complete Guide to Gold Prices, Purity & Investment',
    description: 'Comprehensive guide to gold prices in India, including purity levels, price trends, investment strategies, and city-wise price comparisons.',
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
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Gold Price Guide', href: '/gold-price-guide' },
            ]}
          />

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800">
                <Award className="w-6 h-6 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Gold Price Guide
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Complete guide to gold prices, purity, and investment in India
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Understanding Gold Prices in India
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Gold prices in India are influenced by multiple factors including international market rates, 
                currency exchange rates, local demand, government policies, and regional market conditions. 
                Understanding these factors helps you make informed investment decisions.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                Key Factors Affecting Gold Prices
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>International gold market rates (London Bullion Market, COMEX)</li>
                <li>USD to INR exchange rate</li>
                <li>Local demand and supply dynamics</li>
                <li>Government taxes and import duties</li>
                <li>Making charges (for jewelry)</li>
                <li>Dealer margins and regional variations</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                Gold Purity Levels
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Gold purity is measured in karats (K). The most common purities in India are:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li><strong>24K Gold:</strong> 99.9% pure, best for investment (bars, coins)</li>
                <li><strong>22K Gold:</strong> 91.6% pure, commonly used for Indian jewelry</li>
                <li><strong>18K Gold:</strong> 75% pure, used for diamond jewelry and international designs</li>
              </ul>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/24k-vs-22k-vs-18k-gold"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  24K vs 22K vs 18K Gold
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Compare gold purity levels and find which is best for your needs
              </p>
            </Link>

            <Link
              href="/gold-price-trends-2025"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Gold Price Trends 2025
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Expert analysis and predictions for gold prices in 2025
              </p>
            </Link>

            <Link
              href="/best-cities-to-buy-gold"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                  <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Best Cities to Buy Gold
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Compare prices across major Indian cities
              </p>
            </Link>

            <Link
              href="/gold-vs-silver-investment"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Gold vs Silver Investment
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Compare gold and silver as investment options
              </p>
            </Link>

            <Link
              href="/gold/price-in/mumbai"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
                  <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Gold Price in Mumbai
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Live gold prices in Mumbai, India's largest trading hub
              </p>
            </Link>

            <Link
              href="/gold/price-in/delhi"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center group-hover:bg-rose-200 dark:group-hover:bg-rose-900/50 transition-colors">
                  <BookOpen className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Gold Price in Delhi
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Live gold prices in Delhi, India's capital
              </p>
            </Link>
          </div>

          {/* Topic Cluster Navigation */}
          <TopicClusterNav cluster="gold" />
        </main>
        <Footer />
      </div>
    </>
  );
}
