import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BadgeCheck, BookOpen, Shield, Mail } from 'lucide-react';
import { getSiteUrl } from '@/utils/siteUrl';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'Editorial Policy | MetalView India',
  description:
    'Learn how MetalView plans, reviews, and updates editorial content about live metal prices, buying guides, and market explainers in India.',
  openGraph: {
    title: 'Editorial Policy | MetalView India',
    description:
      'How MetalView handles editorial standards, review, and updates for metal-price content in India.',
    type: 'website',
    locale: 'en_IN',
    url: `${SITE_URL}/editorial-policy`,
  },
  alternates: {
    canonical: '/editorial-policy',
  },
};

const sections = [
  {
    icon: BadgeCheck,
    title: 'What We Publish',
    body: (
      <>
        <p>MetalView publishes live metal price pages, city-level comparison pages, practical buying guides, and educational market explainers for Indian readers. Our goal is to help people interpret benchmark prices more carefully, not to sensationalize daily moves.</p>
        <p>We focus on content that helps readers understand purity, pricing units, local quote structure, taxes, fabrication or making charges, and the trade-offs behind a visible rate.</p>
      </>
    ),
  },
  {
    icon: BookOpen,
    title: 'How We Review Content',
    body: (
      <>
        <p>Articles and guides are prepared by the MetalView Editorial Desk and reviewed by the MetalView Research Desk before publication or major refreshes. Review focuses on clarity, consistency with our live-rate product, and whether the page gives useful real-world context instead of repeating obvious facts.</p>
        <p>For time-sensitive pages, we prioritize accurate framing over overconfident predictions. When a page involves market trends, we aim to describe drivers and scenarios rather than giving personal financial instructions.</p>
      </>
    ),
  },
  {
    icon: Shield,
    title: 'Standards We Aim To Meet',
    body: (
      <>
        <p>We aim to keep our content practical, plain-English, and decision-useful. We do not promise that a benchmark price equals the final payable amount. We try to make billing structure, product differences, and local market factors clear whenever they are material to a decision.</p>
        <p>We do not sell guaranteed editorial outcomes or rankings. If a page mentions cities, markets, or buying considerations, the purpose is to help readers compare options more carefully.</p>
      </>
    ),
  },
  {
    icon: Mail,
    title: 'How To Reach Us',
    body: (
      <>
        <p>If you spot an unclear statement, outdated explanation, or missing context, contact us at <a href="mailto:metalviewofficial@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">metalviewofficial@gmail.com</a>. Please include the page URL and a short note explaining the issue.</p>
        <p>See our <Link href="/corrections-policy" className="text-amber-600 dark:text-amber-400 hover:underline">Corrections Policy</Link> and <Link href="/methodology" className="text-amber-600 dark:text-amber-400 hover:underline">Methodology</Link> pages for more detail on updates and sourcing.</p>
      </>
    ),
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main className="flex-1 relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Editorial Policy', href: '/editorial-policy' },
          ]}
        />

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            Editorial Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            This page explains how MetalView handles editorial planning, review, and updates for live metal price content and supporting explainers in India.
          </p>
        </header>

        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.title} className="content-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 dark:bg-amber-400/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">{section.title}</h2>
                </div>
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                  {section.body}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
