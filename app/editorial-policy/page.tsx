import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BadgeCheck, BookOpen, Shield, Mail, PenLine, Users } from 'lucide-react';
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
        <p>
          MetalView publishes live metal price hubs, practical buying guides, and educational market explainers for Indian readers. Our goal is to help people interpret benchmark prices carefully, not to sensationalise daily moves or dress a thin rate widget as a newsroom.
        </p>
        <p>
          We focus on content that helps readers understand purity, pricing units, local quote structure, taxes, fabrication or making charges, and the trade-offs behind a visible rate. Typical pieces include how to read a gold jewellery bill, when silver&apos;s per-kg rate matters for jewellery versus investment, and how industrial metals differ from retail precious-metal shopping.
        </p>
        <p>
          We also publish trust pages—About, Methodology, Corrections, Privacy, and Terms—so readers and reviewers can see how the product is built, who it is for, and how to challenge a claim.
        </p>
      </>
    ),
  },
  {
    icon: PenLine,
    title: 'How We Plan Topics',
    body: (
      <>
        <p>
          Topic selection starts from real reader jobs: comparing a dealer quote, choosing between 22K and 24K, deciding whether to buy jewellery or coins, or tracking copper for business planning. We prefer explainers that answer a concrete decision over keyword-only pages that restate the same rate in many URLs.
        </p>
        <p>
          Before publishing a new guide or blog post, we check whether an existing MetalView page already covers the same intent. If it does, we expand or refresh that page instead of creating a near-duplicate. That keeps the indexed catalogue smaller and more useful.
        </p>
      </>
    ),
  },
  {
    icon: BookOpen,
    title: 'How We Review Content',
    body: (
      <>
        <p>
          Articles and guides are prepared by the MetalView Editorial Desk and reviewed by the MetalView Research Desk before publication or major refreshes. Review focuses on clarity, consistency with our live-rate product, unit correctness (gram vs 10g vs kg), and whether the page gives useful real-world context instead of repeating obvious facts.
        </p>
        <p>
          For time-sensitive pages, we prioritise accurate framing over overconfident predictions. When a page involves market trends, we describe drivers and scenarios rather than giving personal financial instructions or &quot;buy now&quot; language.
        </p>
        <p>
          Major refreshes update examples, tax or hallmarking references where relevant, and internal links to the current metal hubs and guide catalogue. Cosmetic rewrites alone are not treated as a full editorial refresh.
        </p>
      </>
    ),
  },
  {
    icon: Users,
    title: 'Who This Content Is For',
    body: (
      <>
        <p>
          Primary readers are jewellery buyers, household savers tracking gold or silver, students and professionals learning how Indian metal quotes work, and small businesses that need a quick copper or industrial-metal reference. Secondary readers include dealers and researchers who want a clean public benchmark plus plain-English context.
        </p>
        <p>
          We write in accessible English for an India audience (INR units, common carat labels, GST and making-charge realities). We do not assume every reader already knows the difference between a benchmark rate and a retail invoice.
        </p>
      </>
    ),
  },
  {
    icon: Shield,
    title: 'Standards We Aim To Meet',
    body: (
      <>
        <p>
          We aim to keep our content practical, plain-English, and decision-useful. We do not promise that a benchmark price equals the final payable amount. We try to make billing structure, product differences, and local market factors clear whenever they are material to a decision.
        </p>
        <p>
          We do not sell guaranteed editorial outcomes or paid rankings dressed as independent advice. If a page mentions cities, markets, or buying considerations, the purpose is to help readers compare options more carefully.
        </p>
        <p>
          Advertising, if shown, is separate from editorial judgement. Sponsored placements or affiliate relationships, if introduced later, will be disclosed on the relevant pages.
        </p>
      </>
    ),
  },
  {
    icon: Mail,
    title: 'How To Reach Us',
    body: (
      <>
        <p>
          If you spot an unclear statement, outdated explanation, or missing context, contact us at{' '}
          <a href="mailto:metalviewofficial@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">
            metalviewofficial@gmail.com
          </a>
          . Please include the page URL and a short note explaining the issue.
        </p>
        <p>
          See our <Link href="/corrections-policy" className="text-amber-600 dark:text-amber-400 hover:underline">Corrections Policy</Link> and{' '}
          <Link href="/methodology" className="text-amber-600 dark:text-amber-400 hover:underline">Methodology</Link> pages for more detail on updates and sourcing. Broader product background is on{' '}
          <Link href="/about" className="text-amber-600 dark:text-amber-400 hover:underline">About</Link>.
        </p>
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
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
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
