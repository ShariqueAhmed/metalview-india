/**
 * Gold vs Silver Investment Comparison Page
 * SEO-optimized comparison guide
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TrendingUp, TrendingDown, DollarSign, Award, BarChart3, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gold vs Silver Investment: Which is Better in 2025? | MetalView India',
  description: 'Compare gold vs silver investment in India. Understand returns, risks, liquidity, and which metal is better for your investment goals. Expert analysis and comparison.',
  keywords: [
    'gold vs silver investment',
    'gold vs silver which is better',
    'gold investment vs silver',
    'best investment gold or silver',
    'gold vs silver returns',
    'silver vs gold investment india',
    'gold silver comparison',
  ],
  openGraph: {
    title: 'Gold vs Silver Investment: Which is Better? | MetalView',
    description: 'Compare gold vs silver investment in India. Expert analysis of returns, risks, and liquidity.',
    type: 'article',
    locale: 'en_IN',
    url: 'https://metalview.in/gold-vs-silver-investment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold vs Silver Investment: Which is Better?',
    description: 'Compare gold vs silver investment in India. Expert analysis.',
  },
  alternates: {
    canonical: 'https://metalview.in/gold-vs-silver-investment',
  },
};

export default function GoldVsSilverInvestmentPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  // Article schema for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gold vs Silver Investment: Which is Better in 2025?',
    description: 'Comprehensive comparison of gold vs silver investment in India, including returns, risks, liquidity, and expert recommendations.',
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/gold-vs-silver-investment`,
    },
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
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-50">Gold vs Silver Investment</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Gold vs Silver Investment: Which is Better in 2025?
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              A comprehensive comparison of gold and silver investments in India, including returns, risks, liquidity, and expert recommendations.
            </p>
          </div>

          {/* Quick Comparison Table */}
          <div className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Quick Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-slate-50">Factor</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-700 dark:text-amber-400">Gold</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Silver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Price Volatility</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Lower (More Stable)</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Higher (More Volatile)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Investment Amount</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Higher (₹65,000+/10g)</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Lower (₹85,000+/1kg)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Liquidity</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Excellent</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Good</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Storage</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Compact</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Bulkier</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Industrial Demand</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Low</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">High</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Cultural Value</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Very High</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Moderate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Gold Investment Section */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800">
                <Award className="w-6 h-6 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Gold Investment
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  Advantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Stable and reliable store of value</li>
                  <li>High liquidity - easy to buy and sell</li>
                  <li>Compact storage - high value per unit</li>
                  <li>Strong cultural and emotional value in India</li>
                  <li>Lower price volatility compared to silver</li>
                  <li>Accepted worldwide as currency hedge</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                  Disadvantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Higher initial investment required</li>
                  <li>Lower potential returns compared to silver</li>
                  <li>Limited industrial applications</li>
                  <li>Storage and insurance costs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Silver Investment Section */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700">
                <DollarSign className="w-6 h-6 text-slate-700 dark:text-slate-300" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Silver Investment
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  Advantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Lower entry barrier - affordable for small investors</li>
                  <li>Higher price volatility = higher profit potential</li>
                  <li>Strong industrial demand (electronics, solar, medical)</li>
                  <li>Growing demand from green energy sector</li>
                  <li>Portfolio diversification</li>
                  <li>Potential for higher percentage returns</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                  Disadvantages
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  <li>Higher price volatility = higher risk</li>
                  <li>Bulkier storage requirements</li>
                  <li>Lower liquidity compared to gold</li>
                  <li>More susceptible to market manipulation</li>
                  <li>Industrial demand can fluctuate</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Which Should You Choose */}
          <section className="mb-12 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Which Should You Choose?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-3">
                  Choose Gold If:
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>You want stability and wealth preservation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>You have higher investment capital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>You prefer lower risk investments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>You need high liquidity</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                  Choose Silver If:
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>You have limited investment capital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>You're comfortable with higher risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>You want higher growth potential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>You believe in industrial demand growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Expert Recommendation */}
          <section className="mb-12 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Expert Recommendation
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Most financial experts recommend a <strong>balanced approach</strong>:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li><strong>70-80% in Gold:</strong> For stability and wealth preservation</li>
                <li><strong>20-30% in Silver:</strong> For growth potential and diversification</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400">
                This allocation balances the stability of gold with the growth potential of silver, creating a well-diversified precious metals portfolio.
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
                href="/24k-vs-22k-vs-18k-gold"
                className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-950/30 transition-colors"
              >
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  24K vs 22K vs 18K Gold
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Compare different gold purities
                </p>
              </Link>
              <Link
                href="/best-cities-to-buy-gold"
                className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">
                  Best Cities to Buy Gold
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Find the best prices across India
                </p>
              </Link>
            </div>
          </section>

          {/* Topic Cluster Navigation */}
          {/* <TopicClusterNav cluster="investment" /> */}
        </main>
        <Footer />
      </div>
    </>
  );
}
