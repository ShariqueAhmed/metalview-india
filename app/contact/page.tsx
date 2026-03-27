import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | MetalView India',
  description: 'Get in touch with MetalView India for any queries, feedback, or support regarding live metal prices.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main className="flex-1 relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            <span className="home-hero-gradient">Contact Us</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions, feedback, or need assistance? We're here to help!
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Email Card */}
          <div className="content-card p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 dark:bg-amber-400/10 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Email Us</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">
              For general inquiries, feedback, and support, please send us an email.
            </p>
            <a
              href="mailto:metalviewofficial@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-sm font-semibold rounded-lg transition-colors focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
            >
              metalviewofficial@gmail.com
            </a>
          </div>

          {/* Business Inquiry Card */}
          <div className="content-card p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-sky-500/15 dark:bg-sky-400/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-sky-600 dark:text-sky-400" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Business Inquiries</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">
              For partnerships, advertising, or data API queries, reach out to our team.
            </p>
            <a
              href="mailto:metalviewofficial@gmail.com?subject=Business%20Inquiry"
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-sm font-semibold rounded-lg transition-colors border border-sky-200/80 dark:border-sky-700/50 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
            >
              Contact Business Team
            </a>
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-8 content-card text-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Response Time</h2>
          <p className="text-slate-600 dark:text-slate-400">
            We aim to respond to all inquiries within 24-48 hours during business days. For the fastest response, please ensure your email subject clearly states the nature of your inquiry.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
