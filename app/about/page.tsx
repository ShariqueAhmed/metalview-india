/**
 * About MetalView - Helps meet AdSense minimum content and quality guidelines
 */

import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Info, RefreshCw, Shield, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About MetalView - How We Get Gold & Silver Prices in India',
  description: 'Learn how MetalView provides live gold, silver, copper, platinum, and palladium prices in India. Our data sources, update frequency, and commitment to accurate metal pricing.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-6">
          About MetalView
        </h1>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              What We Do
            </h2>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
            <p>
              MetalView is a free resource for live precious and industrial metal prices in India. We help you check today&apos;s gold rate, silver price, copper, platinum, and palladium rates across major Indian cities so you can make informed decisions whether you&apos;re buying jewellery, investing, or tracking commodity markets.
            </p>
            <p>
              Our site shows real-time prices per gram and per 10 grams (or per kilogram where relevant), historical trends, and city-wise comparisons. We aim to give you one place to see accurate, up-to-date metal rates without having to visit multiple sources.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              How We Get Our Prices
            </h2>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
            <p>
              Our gold and silver prices are sourced from Angel One (AngelOne), a trusted financial services platform in India. We use their public APIs to fetch live rates for multiple cities and purities (e.g. 24K, 22K, 18K gold). Copper prices are sourced from established financial data providers. Platinum and palladium rates are obtained from reliable commodity data sources. We do not set or manipulate prices; we aggregate and display them for your convenience.
            </p>
            <p>
              Prices are typically updated every few minutes during market hours. You&apos;ll see a &quot;Last updated&quot; timestamp on each page so you know how fresh the data is. Rates can change quickly, so we always recommend confirming with your dealer or broker before making a purchase or investment decision.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              What You Can Do Here
            </h2>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
            <p>
              You can view live gold and silver prices for your city, compare rates across Mumbai, Delhi, Bangalore, Kolkata, Chennai, and other major cities, and see historical price trends and simple charts. We also provide guides on topics like gold vs silver investment, understanding 24K vs 22K vs 18K gold, and how local demand and taxes affect metal prices. All of this is intended for general information and education, not as financial or investment advice.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              Disclaimer
            </h2>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
            <p>
              Prices on MetalView are indicative and for informational purposes only. They may differ from actual dealer or exchange rates due to making charges, taxes, premiums, and local market conditions. We do not guarantee the accuracy or completeness of any price or data. Always verify with your local jeweller, bank, or broker before making any purchase or investment. MetalView is not a registered investment or financial advisor; we do not provide personalised financial advice.
            </p>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          >
            ← Back to live metal prices
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
