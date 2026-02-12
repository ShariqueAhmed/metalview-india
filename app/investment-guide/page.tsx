/**
 * Investment Guide Hub Page
 * Central hub for all investment-related content
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicClusterNav from '@/components/TopicClusterNav';
import Breadcrumbs from '@/components/Breadcrumbs';
import { TrendingUp, DollarSign, BarChart3, Shield, BookOpen, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investment Guide: Complete Guide to Metal Investments in India | MetalView India',
  description: 'Complete guide to metal investments in India. Learn about gold, silver, platinum, and palladium investment strategies, price trends, best cities to buy, and expert insights.',
  keywords: [
    'investment guide',
    'metal investment guide',
    'gold investment guide',
    'silver investment guide',
    'precious metals investment',
    'investment strategies',
    'best cities to buy gold',
    'gold vs silver investment',
  ],
  openGraph: {
    title: 'Investment Guide: Complete Guide to Metal Investments | MetalView',
    description: 'Complete guide to metal investments, strategies, and market trends in India.',
    type: 'article',
    locale: 'en_IN',
    url: 'https://metalview.in/investment-guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Guide: Complete Guide to Metal Investments',
    description: 'Learn everything about metal investments and strategies in India.',
  },
  alternates: {
    canonical: 'https://metalview.in/investment-guide',
  },
};

export default function InvestmentGuidePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Investment Guide: Complete Guide to Metal Investments in India',
    description: 'Comprehensive guide to metal investments in India, including gold, silver, platinum, and palladium investment strategies, price trends, and city-wise comparisons.',
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
              { label: 'Investment Guide', href: '/investment-guide' },
            ]}
          />

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800">
                <TrendingUp className="w-6 h-6 text-blue-700 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Investment Guide
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Complete guide to metal investments and strategies in India
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Metal Investments in India
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Investing in precious metals like gold, silver, platinum, and palladium has been a 
                traditional wealth preservation strategy in India for centuries. Understanding the 
                different metals, their price trends, and investment strategies helps you make 
                informed decisions.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                Types of Metal Investments
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li><strong>Gold:</strong> Traditional safe-haven asset, best for long-term wealth preservation</li>
                <li><strong>Silver:</strong> Dual role as precious and industrial metal, higher volatility</li>
                <li><strong>Platinum:</strong> Rarer than gold, strong industrial demand</li>
                <li><strong>Palladium:</strong> Rarest precious metal, high industrial demand</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                Investment Strategies
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Key strategies for metal investments:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Diversification across different metals</li>
                <li>Long-term holding for wealth preservation</li>
                <li>Regular investment (SIP approach)</li>
                <li>Understanding price trends and market factors</li>
                <li>Choosing the right form (bars, coins, jewelry)</li>
              </ul>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                Expert analysis and predictions for gold prices
              </p>
            </Link>

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
                Compare gold purity levels for investment
              </p>
            </Link>

            <Link
              href="/gold-price-guide"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
                  <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Gold Price Guide
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Complete guide to gold prices and investment
              </p>
            </Link>

            <Link
              href="/silver-investment-guide"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Shield className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                  Silver Investment Guide
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Complete guide to silver prices and investment
              </p>
            </Link>
          </div>

          {/* Topic Cluster Navigation */}
          <TopicClusterNav cluster="investment" />
        </main>
        <Footer />
      </div>
    </>
  );
}
