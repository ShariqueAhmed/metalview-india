/**
 * Privacy Policy Page
 * Required for Google AdSense and other monetization services
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | MetalView India',
  description: 'Privacy Policy for MetalView India - Learn how we collect, use, and protect your data.',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">
                Privacy Policy
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              At MetalView India, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>metalview.in</strong>. Please read this privacy policy carefully.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">1. Automatically Collected Information</h3>
                <p className="leading-relaxed">
                  When you visit our website, we automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages you visit and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Date and time of your visit</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">2. Cookies and Tracking Technologies</h3>
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                How We Use Your Information
              </h2>
            </div>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Analyze how users interact with our website</li>
                <li>Personalize your experience</li>
                <li>Send you updates and communications (if you subscribe)</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                Third-Party Services
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Google Analytics</h3>
                <p className="leading-relaxed">
                  We use Google Analytics to analyze website traffic and user behavior. Google Analytics uses cookies to collect information such as how often users visit our site, what pages they visit, and what other sites they used prior to coming to our site. We use the information we get from Google Analytics to improve our website.
                </p>
                <p className="mt-2">
                  <strong>Opt-out:</strong> You can opt-out of Google Analytics by installing the{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Google AdSense</h3>
                <p className="leading-relaxed">
                  We may use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
                </p>
                <p className="mt-2">
                  <strong>Opt-out:</strong> You can opt-out of personalized advertising by visiting{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">
                    Google's Ads Settings
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Data Security
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Your Rights
            </h2>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Children's Privacy
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Contact Us
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Email:</strong>{' '}
                <a 
                  href="mailto:metalviewofficial@gmail.com" 
                  className="text-amber-600 dark:text-amber-400 hover:underline"
                >
                  metalviewofficial@gmail.com
                </a>
              </p>
              <p className="text-slate-700 dark:text-slate-300 mt-2">
                <strong>Website:</strong>{' '}
                <Link href="/" className="text-amber-600 dark:text-amber-400 hover:underline">
                  https://metalview.in
                </Link>
              </p>
            </div>
          </section>

          {/* Back to Home */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
