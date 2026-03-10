/**
 * Guides & Resources Hub
 * Central page for all guides and editorial content - supports AdSense minimum content and UX
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BookOpen, BarChart3, DollarSign, MapPin, Award, FileText, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guides & Resources - Gold, Silver & Metal Prices in India | MetalView',
  description: 'Expert guides on gold and silver prices, investment strategies, purity (24K, 22K, 18K), best cities to buy, and market trends. Learn how to track and use metal prices in India.',
  keywords: [
    'gold price guide',
    'silver investment guide',
    'metal price resources',
    'gold purity guide',
    'investment guides india',
    'precious metals guides',
  ],
  openGraph: {
    title: 'Guides & Resources - Gold, Silver & Metal Prices | MetalView',
    description: 'Expert guides on metal prices, investment, purity, and market trends in India.',
    url: 'https://metalview.in/guides',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: '/guides',
  },
};

const GUIDE_LINKS = [
  {
    href: '/gold-price-guide',
    title: 'Gold Price Guide',
    description: 'Complete guide to gold prices in India: 24K, 22K, 18K purity, price trends, and how to use live rates for investment and jewellery buying.',
    icon: Award,
    category: 'Gold',
    accent: 'from-amber-400 to-yellow-500',
  },
  {
    href: '/silver-investment-guide',
    title: 'Silver Investment Guide',
    description: 'Understand silver prices per kg and per gram, factors affecting rates, and how silver compares to gold as an investment in India.',
    icon: DollarSign,
    category: 'Silver',
    accent: 'from-slate-400 to-slate-600',
  },
  {
    href: '/investment-guide',
    title: 'Investment Guide',
    description: 'Metal investment strategies, portfolio allocation, and how to use gold, silver, platinum, and palladium prices for informed decisions.',
    icon: BarChart3,
    category: 'Investment',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    href: '/gold-vs-silver-investment',
    title: 'Gold vs Silver Investment',
    description: 'Compare gold and silver as investments: returns, volatility, uses, and which may suit your goals and risk profile.',
    icon: BarChart3,
    category: 'Investment',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    href: '/24k-vs-22k-vs-18k-gold',
    title: '24K vs 22K vs 18K Gold',
    description: 'Difference between 24 karat, 22 karat, and 18 karat gold: purity, uses, pricing, and what to choose for jewellery vs investment.',
    icon: Award,
    category: 'Gold',
    accent: 'from-amber-400 to-yellow-600',
  },
  {
    href: '/gold-price-trends-2025',
    title: 'Gold Price Trends 2025',
    description: 'Analysis of gold price trends, factors driving rates, and what to expect in the Indian market in 2025.',
    icon: BarChart3,
    category: 'Market',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    href: '/best-cities-to-buy-gold',
    title: 'Best Cities to Buy Gold',
    description: 'Where to buy gold in India: city-wise comparison of markets, trust, and pricing for major cities.',
    icon: MapPin,
    category: 'Cities',
    accent: 'from-violet-500 to-purple-500',
  },
  {
    href: '/blog',
    title: 'Blog – News & Insights',
    description: 'Articles on gold purity, hallmarking, when to buy, how to calculate gold price, city-wise guides, and market analysis.',
    icon: FileText,
    category: 'Blog',
    accent: 'from-sky-500 to-blue-500',
  },
];

export default function GuidesPage() {
  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main className="flex-1 relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides & Resources', href: '/guides' },
          ]}
        />

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200/60 dark:border-amber-700/40 px-3.5 py-1.5 mb-6 text-xs font-medium text-amber-800 dark:text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden />
            Expert guides & resources
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            <span className="home-hero-gradient">Guides & Resources</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            MetalView provides original guides and resources to help you understand gold, silver, and other metal prices in India. Use these articles alongside our live price data to make informed decisions about buying, investing, and comparing rates across cities.
          </p>
        </header>

        <section className="space-y-5" aria-labelledby="guides-list">
          <h2 id="guides-list" className="sr-only">
            All guides and resources
          </h2>
          {GUIDE_LINKS.map((guide) => {
            const Icon = guide.icon;
            return (
              <article
                key={guide.href}
                className="content-card metal-card-shine p-6 sm:p-7 hover:shadow-lg dark:hover:shadow-amber-500/5 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${guide.accent} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                      {guide.category}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-1 mb-2">
                      <Link
                        href={guide.href}
                        className="hover:text-amber-600 dark:hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded transition-colors"
                      >
                        {guide.title}
                      </Link>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {guide.description}
                    </p>
                    <Link
                      href={guide.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:gap-3 transition-all"
                    >
                      Read guide
                      <ArrowRight className="w-4 h-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-700/80">
          <h2 className="section-title mb-4">
            Live prices and tools
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-5">
            All guides are meant to be used with our live metal prices. Check today&apos;s gold rate, silver price, and other metal rates for your city on the homepage, and use city-specific pages for detailed trends and history.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-600 dark:to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/25"
          >
            <BookOpen className="w-4 h-4" aria-hidden />
            View live metal prices
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
