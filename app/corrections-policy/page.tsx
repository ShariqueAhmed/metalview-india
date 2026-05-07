import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Mail, RefreshCw, CheckCircle2 } from 'lucide-react';
import { getSiteUrl } from '@/utils/siteUrl';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Corrections Policy | MetalView India',
  description:
    'Learn how MetalView reviews reader-reported issues, updates pages, and handles corrections to editorial content and price-context pages.',
  openGraph: {
    title: 'Corrections Policy | MetalView India',
    description:
      'How MetalView handles updates and corrections for editorial content and price-context pages.',
    type: 'website',
    locale: 'en_IN',
    url: `${SITE_URL}/corrections-policy`,
  },
  alternates: {
    canonical: '/corrections-policy',
  },
};

export default function CorrectionsPolicyPage() {
  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main className="flex-1 relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Corrections Policy', href: '/corrections-policy' },
          ]}
        />

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            Corrections Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            We want MetalView pages to stay useful, reviewable, and up to date. This page explains how we handle reader-reported issues and editorial updates.
          </p>
        </header>

        <div className="space-y-8">
          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 dark:bg-amber-400/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">How To Report an Issue</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>Email <a href="mailto:metalviewofficial@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">metalviewofficial@gmail.com</a> with the page URL, a short explanation of the problem, and any supporting context. Helpful examples include a broken link, outdated guidance, confusing label, or factual statement that needs review.</p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-sky-500/15 dark:bg-sky-400/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">What We Review</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>We review editorial wording, methodological clarity, broken links, outdated examples, and any issue that could materially affect how a reader interprets a benchmark rate or buying guide. Benchmark price volatility alone is not treated as an editorial correction unless the page explains the context inaccurately.</p>
            </div>
          </section>

          <section className="content-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 dark:bg-emerald-400/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">How We Update Pages</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>If we confirm an issue, we update the relevant page and refresh the visible review or last-updated date where appropriate. For recurring issues that affect multiple pages, we may update shared templates, methodology text, or editorial standards pages as well.</p>
              <p>For more detail on how content is reviewed and how benchmark rates are sourced, see our <Link href="/editorial-policy" className="text-amber-600 dark:text-amber-400 hover:underline">Editorial Policy</Link> and <Link href="/methodology" className="text-amber-600 dark:text-amber-400 hover:underline">Methodology</Link> pages.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
