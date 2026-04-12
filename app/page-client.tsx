/**
 * Homepage Client – Hub linking to separate metal pages
 * Each metal has its own page: /gold, /silver, /copper, /platinum, /palladium
 */

'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, DollarSign, Zap, Gem, ArrowRight, Sparkles } from 'lucide-react';

const METALS = [
  {
    id: 'gold',
    name: 'Gold',
    href: '/gold',
    description: '24K, 22K, 18K gold prices per gram and 10g. Live rates across Indian cities.',
    icon: Award,
    accent: 'from-amber-400 via-yellow-500 to-amber-600',
    accentDark: 'from-amber-500 via-amber-400 to-yellow-500',
    bg: 'bg-amber-500/10 dark:bg-amber-400/5',
    border: 'border-amber-200/80 dark:border-amber-500/30',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-400/60',
    iconGradient: 'from-amber-500 to-yellow-600 dark:from-amber-400 dark:to-amber-600',
    cta: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'silver',
    name: 'Silver',
    href: '/silver',
    description: 'Silver price per kg and per gram. Live rates and historical trends.',
    icon: DollarSign,
    accent: 'from-slate-400 via-slate-300 to-slate-500',
    accentDark: 'from-slate-300 via-slate-200 to-slate-400',
    bg: 'bg-slate-400/10 dark:bg-slate-400/5',
    border: 'border-slate-200/80 dark:border-slate-500/30',
    hoverBorder: 'hover:border-slate-400 dark:hover:border-slate-400/60',
    iconGradient: 'from-slate-500 to-slate-700 dark:from-slate-400 dark:to-slate-300',
    cta: 'text-slate-600 dark:text-slate-300',
  },
  {
    id: 'copper',
    name: 'Copper',
    href: '/copper',
    description: 'Copper price per kg. MCX-based live rates.',
    icon: Zap,
    accent: 'from-orange-400 via-amber-600 to-orange-600',
    accentDark: 'from-orange-400 via-orange-500 to-amber-600',
    bg: 'bg-orange-500/10 dark:bg-orange-400/5',
    border: 'border-orange-200/80 dark:border-orange-500/30',
    hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-400/60',
    iconGradient: 'from-orange-500 to-amber-700 dark:from-orange-400 dark:to-orange-600',
    cta: 'text-orange-600 dark:text-orange-400',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    href: '/platinum',
    description: 'Platinum price per 10g and per gram. Live rates in India.',
    icon: Gem,
    accent: 'from-sky-400 via-blue-500 to-indigo-500',
    accentDark: 'from-sky-300 via-blue-400 to-indigo-400',
    bg: 'bg-sky-500/10 dark:bg-sky-400/5',
    border: 'border-sky-200/80 dark:border-sky-500/30',
    hoverBorder: 'hover:border-sky-400 dark:hover:border-sky-400/60',
    iconGradient: 'from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500',
    cta: 'text-sky-600 dark:text-sky-400',
  },
  {
    id: 'palladium',
    name: 'Palladium',
    href: '/palladium',
    description: 'Palladium price per 10g. Live rates and trends.',
    icon: Gem,
    accent: 'from-violet-400 via-purple-500 to-fuchsia-500',
    accentDark: 'from-violet-300 via-purple-400 to-fuchsia-400',
    bg: 'bg-violet-500/10 dark:bg-violet-400/5',
    border: 'border-violet-200/80 dark:border-violet-500/30',
    hoverBorder: 'hover:border-violet-400 dark:hover:border-violet-400/60',
    iconGradient: 'from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500',
    cta: 'text-violet-600 dark:text-violet-400',
  },
] as const;

export default function HomeClient() {
  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main
        id="main-content"
        className="flex-1 relative z-10 max-w-5xl mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 pb-10 sm:pb-14"
        role="main"
      >
        {/* Hero */}
        <header className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200/60 dark:border-amber-700/40 px-3.5 py-1.5 mb-6 text-xs font-medium text-amber-800 dark:text-amber-200 animate-slide-up-fade opacity-0 [animation-fill-mode:forwards]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden />
            Live rates · Updated continuously
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-4 sm:text-4xl lg:text-5xl lg:leading-tight animate-slide-up-fade opacity-0 [animation-fill-mode:forwards] [animation-delay:75ms]">
            <span className="home-hero-gradient">Live Metal Prices</span>
            <br className="sm:hidden" />
            <span className="text-slate-800 dark:text-slate-200"> in India</span>
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl sm:text-lg leading-relaxed animate-slide-up-fade opacity-0 [animation-fill-mode:forwards] [animation-delay:150ms]">
            Real-time gold, silver, copper, platinum, and palladium rates. Choose a metal to see today&apos;s price, historical trends, and city-wise rates.
          </p>
        </header>

        {/* Metal cards */}
        <section
          aria-labelledby="metal-pages"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <h2 id="metal-pages" className="sr-only">
            Metal price pages
                    </h2>
          {METALS.map((metal, i) => {
            const Icon = metal.icon;
                return (
              <Link
                key={metal.id}
                href={metal.href}
                className={`group metal-card-shine relative flex flex-col rounded-2xl border-2 ${metal.border} ${metal.hoverBorder} ${metal.bg} dark:bg-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-amber-500/5 transition-all duration-300 text-left min-h-[140px] sm:min-h-0 touch-manipulation active:scale-[0.99] opacity-0 animate-slide-up-fade [animation-fill-mode:forwards]`}
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                {/* Top accent bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${metal.accent} dark:bg-gradient-to-r ${metal.accentDark} opacity-90`}
                  aria-hidden
                />
                <div className={`inline-flex w-12 h-12 sm:w-14 sm:h-14 rounded-xl items-center justify-center mb-4 border border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br ${metal.iconGradient} flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-1.5 sm:mb-2 group-hover:opacity-90 transition-opacity sm:text-xl">
                  {metal.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3 sm:line-clamp-none">
                  {metal.description}
                </p>
                <span className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${metal.cta} min-h-[44px] items-center group-hover:gap-3 transition-all duration-200`}>
                  View {metal.name} prices
                  <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </span>
                      </Link>
                    );
                  })}
        </section>

        <section className="mt-10 sm:mt-12 mb-10 sm:mb-12 content-card p-5 sm:p-6 lg:p-7">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Why Readers Trust MetalView
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Transparent sourcing</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We explain where price data comes from, how often it updates, and why dealer rates can still vary offline.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Publisher-first content</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Alongside live rates, we publish guides on purity, taxes, city differences, and buying decisions so the site adds context, not just numbers.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Direct contact</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Readers can reach us at <a href="mailto:metalviewofficial@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">metalviewofficial@gmail.com</a> for corrections, support, and business queries.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 sm:mt-16 grid gap-4 md:grid-cols-2">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Before You Use Today&apos;s Price</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Rates on MetalView are indicative. Always confirm final dealer pricing, making charges, GST, purity, and availability before purchasing jewellery, coins, or bars.
            </p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Learn How We Work</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              See our <Link href="/about" className="font-medium text-amber-600 dark:text-amber-400 hover:underline active:opacity-80 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded">About</Link> page for data sourcing and standards, and browse <Link href="/guides" className="font-medium text-amber-600 dark:text-amber-400 hover:underline active:opacity-80 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded">Guides</Link> for deeper explainers on purity, taxes, and market context.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
