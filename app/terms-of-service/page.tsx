import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, AlertTriangle, Scale, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | MetalView India',
  description: 'Terms of Service and Conditions for using MetalView India. Please read carefully before using our platform.',
  robots: 'index, follow',
  alternates: {
    canonical: '/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main className="flex-1 relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="content-card p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-400/20 dark:to-purple-400/20 flex items-center justify-center border border-indigo-200/80 dark:border-indigo-700/50">
                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">
                Terms of Service
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <section className="mb-8">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Welcome to MetalView India (metalview.in). By accessing or using our website, you agree to comply with and be bound by the following Terms of Service. If you disagree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                1. Disclaimer of Accuracy & Financial Advice
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                <strong className="text-slate-900 dark:text-slate-50">Not Financial Advice:</strong> All information, data, and prices provided on MetalView India are for informational and educational purposes only. We are not a registered investment advisor, broker-dealer, or financial analyst. Nothing contained on the site constitutes a recommendation or solicitation to buy or sell any precious metal or financial instrument.
              </p>
              <p className="leading-relaxed">
                <strong className="text-slate-900 dark:text-slate-50">Indicative Prices:</strong> While we strive to provide accurate, real-time data sourced from reputable financial APIs (such as Angel One), prices are strictly indicative. The actual price you pay or receive for gold, silver, copper, platinum, or palladium may vary significantly due to local dealer premiums, making charges, GST, and market fluctuations. Always verify current prices with a professional offline dealer before executing any transactions.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                2. Use of Website
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>You must be at least 18 years old to use this website.</li>
                <li>You agree to use this site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the website.</li>
                <li>You may not use data scraping, mining, or extraction methods without our explicit written consent.</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                3. Third-Party Links & Ads
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                Our site may contain advertisements (such as Google AdSense) and links to third-party websites. We have no control over the content, privacy policies, or practices of any third-party websites or services. We do not warrant the offerings of any of these entities or their websites.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              4. Limitation of Liability
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              In no event shall MetalView India or its owners be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our website or the delay/inability to use our data. This includes but is not limited to financial losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              5. Changes to Terms
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Contact Us
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at <a href="mailto:metalviewofficial@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">metalviewofficial@gmail.com</a>.
            </p>
          </section>
          
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-700/80 flex gap-4">
            <Link
              href="/"
              className="inline-flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold transition-colors focus:ring-2 focus:ring-amber-500 focus:outline-none rounded-lg px-2 py-1"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
