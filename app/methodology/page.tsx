import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Database, RefreshCw, Clock3, ShieldCheck } from 'lucide-react';
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
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>Gold and silver benchmark rates are sourced from Angel One city-level feeds where available. Copper, platinum, and palladium benchmarks are sourced from trusted commodity data providers and market feeds used for tracking price movement.</p>
              <p>MetalView does not set, negotiate, or guarantee prices. We aggregate benchmark data into a consumer-readable format with city pages, metal hubs, and editorial explainers.</p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 dark:bg-emerald-400/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Update and Formatting Process</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>We fetch benchmark data regularly and display a visible last-updated timestamp on core price pages whenever data is available. Historical sections and charts are used to provide context around recent moves, not to promise future outcomes.</p>
              <p>Where practical, we normalize units such as grams, 10 grams, and kilograms so readers can compare like with like. If the underlying market is thinner or more specialized, as with platinum or palladium, we treat the result as an indicative benchmark and say so clearly.</p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 dark:bg-amber-400/10 flex items-center justify-center">
                <Clock3 className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">What Readers Should Verify Independently</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>The rate shown on MetalView is not the same as the final payable bill. Readers should always verify purity, making or fabrication charges, GST, product type, premiums, supplier margin, and availability with the actual seller or provider.</p>
              <p>This is especially important for jewellery, local dealer quotes, bulk orders, and niche metals where retail access is limited or quote conventions vary.</p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-violet-500/15 dark:bg-violet-400/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-violet-600 dark:text-violet-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Questions or Corrections</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>If you believe a page is outdated, a label is unclear, or a benchmark is being interpreted in a misleading way, email <a href="mailto:metalviewofficial@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">metalviewofficial@gmail.com</a> with the page URL and issue summary.</p>
              <p>See our <Link href="/corrections-policy" className="text-amber-600 dark:text-amber-400 hover:underline">Corrections Policy</Link> and <Link href="/editorial-policy" className="text-amber-600 dark:text-amber-400 hover:underline">Editorial Policy</Link> pages for more detail.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
