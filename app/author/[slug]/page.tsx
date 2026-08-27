/**
 * Author page — an E-E-A-T signal for YMYL (money-topic) content.
 * Only renders once a real, verifiable author is configured in utils/authors.ts
 * (hasNamedAuthor()). Until then every author URL 404s, so no empty or
 * placeholder identity is ever published.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Mail, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSiteUrl } from '@/utils/siteUrl';
import { PRIMARY_AUTHOR, hasNamedAuthor } from '@/utils/authors';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return hasNamedAuthor() ? [{ slug: PRIMARY_AUTHOR.slug }] : [];
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!hasNamedAuthor() || slug !== PRIMARY_AUTHOR.slug) {
    return { title: 'Author | MetalView India', robots: { index: false, follow: true } };
  }
  const baseUrl = getSiteUrl();
  return {
    title: `${PRIMARY_AUTHOR.name} – ${PRIMARY_AUTHOR.role} | MetalView India`,
    description: PRIMARY_AUTHOR.bio,
    alternates: { canonical: `${baseUrl}/author/${PRIMARY_AUTHOR.slug}` },
    openGraph: {
      type: 'profile',
      title: `${PRIMARY_AUTHOR.name} – ${PRIMARY_AUTHOR.role}`,
      description: PRIMARY_AUTHOR.bio,
      url: `${baseUrl}/author/${PRIMARY_AUTHOR.slug}`,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  if (!hasNamedAuthor() || slug !== PRIMARY_AUTHOR.slug) {
    notFound();
  }

  const baseUrl = getSiteUrl();
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PRIMARY_AUTHOR.name,
    jobTitle: PRIMARY_AUTHOR.role,
    description: PRIMARY_AUTHOR.bio,
    url: `${baseUrl}/author/${PRIMARY_AUTHOR.slug}`,
    email: PRIMARY_AUTHOR.email,
    sameAs: PRIMARY_AUTHOR.sameAs,
    worksFor: {
      '@type': 'Organization',
      name: 'MetalView India',
      url: baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: PRIMARY_AUTHOR.name, href: `/author/${PRIMARY_AUTHOR.slug}` },
            ]}
          />

          <div className="mt-6 flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-amber-700 dark:text-amber-400">
                {PRIMARY_AUTHOR.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
                {PRIMARY_AUTHOR.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">{PRIMARY_AUTHOR.role}</p>
            </div>
          </div>

          <section className="mt-8 content-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">About</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{PRIMARY_AUTHOR.bio}</p>

            {PRIMARY_AUTHOR.credentials.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                  Experience &amp; expertise
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  {PRIMARY_AUTHOR.credentials.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-4">
              {PRIMARY_AUTHOR.email && (
                <a
                  href={`mailto:${PRIMARY_AUTHOR.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <Mail className="w-4 h-4" /> {PRIMARY_AUTHOR.email}
                </a>
              )}
              {PRIMARY_AUTHOR.sameAs.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" /> {new URL(url).hostname.replace('www.', '')}
                </a>
              ))}
            </div>
          </section>

          <section className="mt-6 content-card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">How MetalView is edited</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              MetalView pairs live benchmark rates with plain-English explainers. Read our{' '}
              <Link href="/editorial-policy" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Editorial Policy</Link>,{' '}
              <Link href="/methodology" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Methodology</Link>, and{' '}
              <Link href="/corrections-policy" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Corrections Policy</Link>{' '}
              to see how prices are sourced and how content is reviewed.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
