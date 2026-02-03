/**
 * Header Component
 * Displays logo, app name, and subtitle
 */

import Link from 'next/link';
import { Award } from 'lucide-react';

export default function Header() {
  return (
    <header className="glass border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-50 flex items-center justify-center transition-colors">
              <Award className="w-5 h-5 text-slate-50 dark:text-slate-900" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
                MetalView India
              </h1>
              <p className="text-xs font-normal text-slate-600 dark:text-slate-400 mt-0.5">
                Real-time Precious Metals Pricing
              </p>
            </div>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
