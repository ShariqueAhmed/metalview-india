import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Database, RefreshCw, Clock3, ShieldCheck, Scale, Layers } from 'lucide-react';
import { getSiteUrl } from '@/utils/siteUrl';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Methodology | MetalView India',
  description:
    'See how MetalView sources, formats, and refreshes benchmark metal prices for gold, silver, copper, platinum, and palladium in India.',
  openGraph: {
    title: 'Methodology | MetalView India',
    description:
      'How MetalView sources, formats, and refreshes benchmark metal prices in India.',
    type: 'website',
    locale: 'en_IN',
    url: `${SITE_URL}/methodology`,
  },
  alternates: {
    canonical: '/methodology',
  },
};

export default function MethodologyPage() {
  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main className="flex-1 relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Methodology', href: '/methodology' },
          ]}
        />

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            Methodology
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            MetalView publishes indicative benchmark prices. This page explains how we source, format, and update those prices so readers can understand what the numbers do and do not represent.
          </p>
        </header>

        <div className="space-y-8">
          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-sky-500/15 dark:bg-sky-400/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Primary Data Sources</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
              <p>
                Gold and silver benchmarks come from licensed city-level market feeds used across India for consumer rate comparison. Where a city feed is available, we show that city&apos;s reference rate for the selected purity or unit. Where a city feed is temporarily unavailable, we fall back to the nearest reliable benchmark and surface a last-updated timestamp so readers can judge freshness.
              </p>
              <p>
                Copper rates are drawn from commodity futures and related market feeds commonly used to track industrial metal movement in India. Platinum and palladium benchmarks come from specialised commodity data providers. These markets are thinner for retail buyers than gold or silver, so we treat those figures as indicative tracking rates rather than guaranteed shop quotes.
              </p>
              <p>
                MetalView does not set, negotiate, or guarantee prices. We aggregate benchmark data into a consumer-readable format across metal hubs, historical charts, and editorial explainers. Live numbers and editorial pages are maintained as one product: the rate shows the market signal; the guides explain how to interpret it.
              </p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 dark:bg-emerald-400/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Update and Formatting Process</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
              <p>
                We fetch benchmark data on a recurring schedule during market hours and cache responses briefly so pages stay fast without serving stale snapshots longer than necessary. Core price pages show a visible last-updated timestamp whenever data is available. Historical sections and charts provide context around recent moves; they are not forecasts and do not promise future outcomes.
              </p>
              <p>
                Where practical, we normalise units such as per gram, per 10 grams, and per kilogram so readers can compare like with like. Gold pages break out common Indian purities (24K, 22K, 18K). Silver is commonly shown per kilogram with gram conversions for jewellery and investment contexts. Copper is typically shown per kilogram for industrial reference. Platinum and palladium use per-10g style units common in Indian retail tracking.
              </p>
              <p>
                If an upstream feed fails, we prefer showing a clear unavailable state over inventing a number. Synthetic or decorative chart points are not used as a substitute for real history. When a metal market is thinner, we say so in page copy so readers do not treat a sparse series as high-confidence retail guidance.
              </p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 dark:bg-orange-400/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-orange-600 dark:text-orange-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">How Pages Are Built From Benchmarks</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
              <p>
                Each metal has a dedicated hub (for example <Link href="/gold" className="text-amber-600 dark:text-amber-400 hover:underline">/gold</Link>) that pairs today&apos;s rate with history, FAQs, and links into guides. Editorial guides sit alongside those hubs so a jewellery buyer, silver investor, or industrial reader can move from the live number into a longer explanation without leaving the site.
              </p>
              <p>
                City comparison tools may exist for convenience, but they are not treated as the site&apos;s primary editorial surface. Our indexed publishing focus is metal hubs, guides, blog explainers, and trust pages. That keeps the crawlable catalogue concentrated on original content rather than large volumes of near-duplicate city templates.
              </p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 dark:bg-amber-400/10 flex items-center justify-center">
                <Clock3 className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">What Readers Should Verify Independently</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
              <p>
                The rate shown on MetalView is not the same as the final payable bill. Before buying jewellery, coins, bars, or industrial metal, verify purity or grade, making or fabrication charges, GST and other taxes, product type (ornament vs coin vs bar), premiums or discounts, supplier margin, hallmarking, and availability with the actual seller or provider.
              </p>
              <p>
                Local dealer quotes can move within the same day, and two shops in the same city can quote different making charges even when the underlying metal rate is similar. Use MetalView to understand the market reference; use the seller invoice to confirm the commercial offer.
              </p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-rose-500/15 dark:bg-rose-400/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Limits of This Methodology</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
              <p>
                MetalView is an informational publisher, not a broker, exchange, or dealer. We do not execute trades, hold metal, or offer personalised financial advice. Benchmark feeds can lag, gap, or fail during outages. Thin markets (especially platinum and palladium in retail India) may show wider spreads between online references and offline quotes.
              </p>
              <p>
                When we discover a labelling error, unit mistake, or misleading framing, we correct it under our <Link href="/corrections-policy" className="text-amber-600 dark:text-amber-400 hover:underline">Corrections Policy</Link>. Editorial standards for how explainers are written and reviewed live on our <Link href="/editorial-policy" className="text-amber-600 dark:text-amber-400 hover:underline">Editorial Policy</Link> page.
              </p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-violet-500/15 dark:bg-violet-400/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-violet-600 dark:text-violet-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Questions or Corrections</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
              <p>
                If you believe a page is outdated, a label is unclear, or a benchmark is being interpreted in a misleading way, email{' '}
                <a href="mailto:metalviewofficial@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">
                  metalviewofficial@gmail.com
                </a>{' '}
                with the page URL and a short issue summary. Include screenshots or quote comparisons when helpful.
              </p>
              <p>
                For broader product questions, see <Link href="/about" className="text-amber-600 dark:text-amber-400 hover:underline">About</Link> and <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">Contact</Link>.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
