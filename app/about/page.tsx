/**
 * About MetalView - Helps meet AdSense minimum content and quality guidelines
 */

import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Info, RefreshCw, Shield, BarChart3, BookOpen, Sparkles, Users, BadgeCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About MetalView - How We Get Gold & Silver Prices in India',
  description: 'Learn how MetalView provides live gold, silver, copper, platinum, and palladium prices in India. Our data sources, update frequency, and commitment to accurate metal pricing.',
  keywords: [
    'about MetalView',
    'metal prices India',
    'gold silver price source',
    'live metal rates',
    'precious metal data',
  ],
  openGraph: {
    title: 'About MetalView - How We Get Metal Prices in India',
    description: 'How MetalView provides live gold, silver, copper, platinum, and palladium prices. Data sources and update frequency.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://metalview.in/about',
  },
  alternates: {
    canonical: '/about',
  },
};

const SECTIONS = [
  {
    icon: Info,
    title: 'What We Do',
    iconBg: 'bg-amber-500/15 dark:bg-amber-400/10',
    iconColor: 'text-amber-600 dark:text-amber-400',
    content: (
      <>
        <p>MetalView is a free resource for live precious and industrial metal prices in India. We help you check today&apos;s gold rate, silver price, copper, platinum, and palladium rates across major Indian cities so you can make informed decisions whether you&apos;re buying jewellery, investing, or tracking commodity markets.</p>
        <p>Our site shows real-time prices per gram and per 10 grams (or per kilogram where relevant), historical trends, and city-wise comparisons. We aim to give you one place to see accurate, up-to-date metal rates without having to visit multiple sources.</p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: 'How We Get Our Prices',
    iconBg: 'bg-sky-500/15 dark:bg-sky-400/10',
    iconColor: 'text-sky-600 dark:text-sky-400',
    content: (
      <>
        <p>Our gold and silver prices are sourced from Angel One (AngelOne), a trusted financial services platform in India. We use their public APIs to fetch live rates for multiple cities and purities (e.g. 24K, 22K, 18K gold). Copper prices are sourced from established financial data providers. Platinum and palladium rates are obtained from reliable commodity data sources. We do not set or manipulate prices; we aggregate and display them for your convenience.</p>
        <p>Prices are typically updated every few minutes during market hours. You&apos;ll see a &quot;Last updated&quot; timestamp on each page so you know how fresh the data is. Rates can change quickly, so we always recommend confirming with your dealer or broker before making a purchase or investment decision.</p>
      </>
    ),
  },
  {
    icon: BarChart3,
    title: 'What You Can Do Here',
    iconBg: 'bg-emerald-500/15 dark:bg-emerald-400/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    content: (
      <>
        <p>You can view live gold and silver prices for your city, compare rates across Mumbai, Delhi, Bangalore, Kolkata, Chennai, and other major cities, and see historical price trends and simple charts. We also provide guides on topics like gold vs silver investment, understanding 24K vs 22K vs 18K gold, and how local demand and taxes affect metal prices. All of this is intended for general information and education, not as financial or investment advice.</p>
        <p>Our <Link href="/guides" className="text-amber-600 dark:text-amber-400 hover:underline font-medium rounded focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">Guides &amp; Resources</Link> page lists all our editorial content in one place. Our <Link href="/blog" className="text-amber-600 dark:text-amber-400 hover:underline font-medium rounded focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">Blog</Link> offers articles on gold purity, hallmarking, when to buy, and city-wise buying guides. We create this content to help you use our price data effectively and understand the factors that move metal markets in India.</p>
      </>
    ),
  },
  {
    icon: BookOpen,
    title: 'Who We\'re For',
    iconBg: 'bg-amber-500/15 dark:bg-amber-400/10',
    iconColor: 'text-amber-600 dark:text-amber-400',
    content: (
      <p>MetalView is built for anyone in India who needs quick, reliable metal prices: individuals checking today&apos;s gold or silver rate before a purchase, investors tracking trends, jewellers comparing city-wise rates, and readers who want to understand purity (24K, 22K, 18K), making charges, and how to use live data. We focus on clarity and accuracy so you can make informed decisions without wading through multiple sources.</p>
    ),
  },
  {
    icon: Shield,
    title: 'Disclaimer',
    iconBg: 'bg-slate-400/20 dark:bg-slate-500/20',
    iconColor: 'text-slate-600 dark:text-slate-400',
    content: (
      <p>Prices on MetalView are indicative and for informational purposes only. They may differ from actual dealer or exchange rates due to making charges, taxes, premiums, and local market conditions. We do not guarantee the accuracy or completeness of any price or data. Always verify with your local jeweller, bank, or broker before making any purchase or investment. MetalView is not a registered investment or financial advisor; we do not provide personalised financial advice.</p>
    ),
  },
  {
    icon: Users,
    title: 'Who Runs MetalView',
    iconBg: 'bg-violet-500/15 dark:bg-violet-400/10',
    iconColor: 'text-violet-600 dark:text-violet-400',
    content: (
      <>
        <p>MetalView is an independent Indian publishing project focused on metal-price transparency, educational explainers, and city-by-city market context. We are not a brokerage, jeweller, exchange, or investment advisory service. Our goal is to make daily metal prices easier to verify and understand for regular readers.</p>
        <p>If you need to reach the team, you can contact us at <a href="mailto:metalviewofficial@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">metalviewofficial@gmail.com</a>. We use this address for reader feedback, corrections, partnership queries, and data questions.</p>
      </>
    ),
  },
  {
    icon: BadgeCheck,
    title: 'Editorial Standards',
    iconBg: 'bg-emerald-500/15 dark:bg-emerald-400/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    content: (
      <>
        <p>We aim to publish practical, plain-English content that adds context to raw price data. That means we explain purity, pricing units, local market differences, taxes, and common buying considerations instead of only repeating live numbers.</p>
        <p>We do not sell rankings or guaranteed placements in our guides. When we mention cities, markets, or buying considerations, the purpose is to help readers interpret rates and compare options more carefully.</p>
      </>
    ),
  },
  {
    icon: Mail,
    title: 'Corrections & Updates',
    iconBg: 'bg-sky-500/15 dark:bg-sky-400/10',
    iconColor: 'text-sky-600 dark:text-sky-400',
    content: (
      <>
        <p>We review source changes, pricing anomalies, and reader feedback regularly. If you spot an outdated guide, broken page, or inaccurate description, please email us with the page URL and the issue so we can review and update it.</p>
        <p>For important corrections, we update the relevant page content and keep the page&apos;s visible last-updated date current where applicable.</p>
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main className="flex-1 relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200/60 dark:border-amber-700/40 px-3.5 py-1.5 mb-6 text-xs font-medium text-amber-800 dark:text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden />
            Our mission
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            <span className="home-hero-gradient">About MetalView</span>
          </h1>
        </header>

        <div className="space-y-8">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.title} className="content-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl ${section.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${section.iconColor}`} strokeWidth={2} aria-hidden />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    {section.title}
                  </h2>
                </div>
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
                  {section.content}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-700/80">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded-lg px-2 py-1"
          >
            ← Back to live metal prices
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
