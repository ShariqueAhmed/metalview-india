/**
 * 24K vs 22K vs 18K Gold Comparison Page
 * Comprehensive guide to gold purity
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicClusterNav from '@/components/TopicClusterNav';
import { Award, Gem, Sparkles, TrendingUp, Shield, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '24K vs 22K vs 18K Gold: Complete Comparison Guide | MetalView India',
  description: 'Compare 24K, 22K, and 18K gold in India. Understand purity, price differences, uses, and which is best for investment vs jewelry. Expert guide.',
  keywords: [
    '24k vs 22k vs 18k gold',
    'gold purity comparison',
    '24k vs 22k gold',
    '22k vs 18k gold',
    'gold karat comparison',
    'best gold purity for investment',
    'gold purity guide india',
  ],
  openGraph: {
    title: '24K vs 22K vs 18K Gold: Complete Comparison | MetalView',
    description: 'Compare 24K, 22K, and 18K gold. Understand purity, prices, and which is best for your needs.',
    type: 'article',
    locale: 'en_IN',
    url: 'https://metalview.in/24k-vs-22k-vs-18k-gold',
  },
  twitter: {
    card: 'summary_large_image',
    title: '24K vs 22K vs 18K Gold: Complete Comparison',
    description: 'Compare gold purities and find which is best for investment vs jewelry.',
  },
  alternates: {
    canonical: 'https://metalview.in/24k-vs-22k-vs-18k-gold',
  },
};

export default function GoldPurityComparisonPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '24K vs 22K vs 18K Gold: Complete Comparison Guide',
    description: 'Comprehensive comparison of 24K, 22K, and 18K gold including purity, price differences, uses, and investment vs jewelry recommendations.',
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
            <span className="text-slate-900 dark:text-slate-50">24K vs 22K vs 18K Gold</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              24K vs 22K vs 18K Gold: Complete Comparison Guide
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Understand the differences between gold purities, their uses, prices, and which is best for investment vs jewelry.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Quick Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-slate-50">Factor</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-700 dark:text-amber-400">24K Gold</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-600 dark:text-amber-500">22K Gold</th>
                    <th className="text-left py-3 px-4 font-semibold text-yellow-600 dark:text-yellow-500">18K Gold</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Purity</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">99.9%</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">91.6%</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">75%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Alloy Content</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">0.1%</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">8.4%</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">25%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Durability</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Soft</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Moderate</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Hard</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Best For</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Investment</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Jewelry</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Modern Jewelry</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Price (per 10g)</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">₹65,000+</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">₹59,500+</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">₹48,750+</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Resale Value</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Highest</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Good</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Lower</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 24K Gold Section */}
          <section className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800">
                <Award className="w-6 h-6 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                24K Gold (Pure Gold)
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                24K gold is the purest form of gold, containing 99.9% pure gold. It's also known as "pure gold" or "fine gold."
              </p>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  Advantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Highest purity and value</li>
                  <li>Best for long-term investment</li>
                  <li>No alloy metals to affect value</li>
                  <li>Easier to resell</li>
                  <li>Highest resale value</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                  Disadvantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Too soft for jewelry</li>
                  <li>Prone to scratches and dents</li>
                  <li>Not suitable for daily wear</li>
                  <li>Higher price per gram</li>
                </ul>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  <strong>Best for:</strong> Investment, bullion coins, bars, long-term wealth preservation
                </p>
              </div>
            </div>
          </section>

          {/* 22K Gold Section */}
          <section className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800">
                <Gem className="w-6 h-6 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                22K Gold
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                22K gold contains 91.6% pure gold mixed with 8.4% other metals (usually copper, silver, or zinc). This is the most popular choice for jewelry in India.
              </p>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  Advantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Durable enough for jewelry</li>
                  <li>Maintains gold's beauty</li>
                  <li>Suitable for daily wear</li>
                  <li>Traditional choice in India</li>
                  <li>Good balance of purity and durability</li>
                  <li>Lower price than 24K</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                  Disadvantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Lower purity than 24K</li>
                  <li>Contains alloy metals</li>
                  <li>Slightly lower resale value</li>
                  <li>Making charges apply for jewelry</li>
                </ul>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  <strong>Best for:</strong> Jewelry, ornaments, traditional Indian designs, daily wear
                </p>
              </div>
            </div>
          </section>

          {/* 18K Gold Section */}
          <section className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 p-6 sm:p-8 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 flex items-center justify-center border-2 border-yellow-200 dark:border-yellow-800">
                <Sparkles className="w-6 h-6 text-yellow-700 dark:text-yellow-400" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                18K Gold
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                18K gold contains 75% pure gold mixed with 25% other metals. It's popular for modern jewelry designs, especially in Western countries.
              </p>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  Advantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Very durable and strong</li>
                  <li>Ideal for intricate designs</li>
                  <li>Lower price than 24K and 22K</li>
                  <li>Popular for modern jewelry</li>
                  <li>Good for settings with gemstones</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                  Disadvantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Lower gold content (75%)</li>
                  <li>Lower resale value</li>
                  <li>Less popular in India</li>
                  <li>May tarnish over time</li>
                </ul>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                  <strong>Best for:</strong> Modern jewelry, engagement rings, gemstone settings, contemporary designs
                </p>
              </div>
            </div>
          </section>

          {/* Which to Choose */}
          <section className="mb-12 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Which Should You Choose?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" aria-hidden="true" />
                  For Investment
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  <strong>Choose 24K Gold</strong> - Highest purity, best resale value, ideal for long-term wealth preservation.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                  <Gem className="w-5 h-5" aria-hidden="true" />
                  For Jewelry
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  <strong>Choose 22K Gold</strong> - Perfect balance of purity and durability, traditional choice in India.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                  For Modern Designs
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  <strong>Choose 18K Gold</strong> - Strong and durable, ideal for contemporary jewelry with gemstones.
                </p>
              </div>
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
                  Compare gold and silver investments
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
                  Find the best prices across India
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
