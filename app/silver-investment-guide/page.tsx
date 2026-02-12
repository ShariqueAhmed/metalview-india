/**
 * Silver Investment Guide Hub Page
 * Central hub for all silver-related content
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicClusterNav from '@/components/TopicClusterNav';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DollarSign, BookOpen, BarChart3, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Silver Investment Guide: Complete Guide to Silver Prices & Investment | MetalView India',
  description: 'Complete guide to silver prices and investment in India. Learn about silver price trends, investment strategies, best cities to buy silver, and comparison with gold. Expert insights and real-time prices.',
  keywords: [
    'silver investment guide',
    'silver price guide',
    'silver price india',
    'silver investment strategy',
    'silver vs gold investment',
    'silver price trends',
    'best cities to buy silver',
    'silver rate today',
  ],
  openGraph: {
    title: 'Silver Investment Guide: Complete Guide to Silver Prices & Investment | MetalView',
    description: 'Complete guide to silver prices, investment strategies, and market trends in India.',
    type: 'article',
    locale: 'en_IN',
    url: 'https://metalview.in/silver-investment-guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Investment Guide: Complete Guide to Silver Prices & Investment',
    description: 'Learn everything about silver prices and investment in India.',
  },
  alternates: {
    canonical: 'https://metalview.in/silver-investment-guide',
  },
};

export default function SilverInvestmentGuidePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Silver Investment Guide: Complete Guide to Silver Prices & Investment',
    description: 'Comprehensive guide to silver prices in India, including investment strategies, price trends, city-wise comparisons, and comparison with gold.',
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
              { label: 'Silver Investment Guide', href: '/silver-investment-guide' },
            ]}
          />

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 flex items-center justify-center border-2 border-slate-200 dark:border-slate-800">
                <DollarSign className="w-6 h-6 text-slate-700 dark:text-slate-400" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Silver Investment Guide
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Complete guide to silver prices and investment strategies in India
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Understanding Silver Prices in India
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Silver prices in India are influenced by both industrial demand and investment demand. 
                Unlike gold, silver has significant industrial applications, making its price more volatile 
                but also offering unique investment opportunities.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                Key Factors Affecting Silver Prices
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Industrial demand (electronics, solar panels, medical applications)</li>
                <li>Investment demand (ETFs, coins, bars)</li>
                <li>Gold prices (often move in tandem)</li>
                <li>US dollar strength</li>
                <li>Interest rates and inflation expectations</li>
                <li>Mining supply and recycling rates</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6">
                Silver as an Investment
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Silver offers unique advantages as an investment:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li><strong>Affordability:</strong> More accessible than gold for small investors</li>
                <li><strong>Dual Role:</strong> Both precious metal and industrial metal</li>
                <li><strong>High Volatility:</strong> Potential for higher returns (and risks)</li>
                <li><strong>Portfolio Diversification:</strong> Reduces overall portfolio risk</li>
              </ul>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/silver/price-in/mumbai"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <DollarSign className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                  Silver Price in Mumbai
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Live silver prices in Mumbai, India's largest trading hub
              </p>
            </Link>

            <Link
              href="/silver/price-in/delhi"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Shield className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                  Silver Price in Delhi
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Live silver prices in Delhi, India's capital
              </p>
            </Link>

            <Link
              href="/silver/price-in/bangalore"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 card-shadow hover:card-shadow-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <BookOpen className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                  Silver Price in Bangalore
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Live silver prices in Bangalore
              </p>
            </Link>

            <Link
              href="/gold-vs-silver-investment"
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 card-shadow hover:card-shadow-hover group"
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
          </div>

          {/* Topic Cluster Navigation */}
          <TopicClusterNav cluster="silver" />
        </main>
        <Footer />
      </div>
    </>
  );
}
