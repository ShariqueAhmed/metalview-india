/**
 * Header Component
 * Displays logo, app name, and subtitle
 */

import Link from 'next/link';
import { TrendingUp, Shield, CheckCircle2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <Link 
            href="/" 
            className="flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:ring-offset-2 rounded-lg"
            aria-label="MetalView India - Home"
          >
            <div className="relative flex-shrink-0">
              {/* Premium logo with gold accent */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-400/10 to-amber-600/20 dark:from-amber-300/30 dark:via-yellow-300/20 dark:to-amber-400/30 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" aria-hidden="true"></div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-amber-500/30 dark:group-hover:shadow-amber-400/30 group-hover:scale-105 border border-amber-300/50 dark:border-amber-500/50">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-slate-900" strokeWidth={2.5} aria-label="MetalView logo - trending up" aria-hidden="false" />
                </div>
                {/* Trust badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 dark:bg-emerald-400 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-lg" aria-label="Verified trusted badge">
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400 bg-clip-text text-transparent drop-shadow-sm">Metal</span>
                  <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 dark:from-slate-200 dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">View</span>
                  <span className="text-slate-900 dark:text-slate-50"> India</span>
                </div>
                {/* Premium badge */}
                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border border-amber-200 dark:border-amber-800/50 rounded-full">
                  <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600 dark:text-amber-400" strokeWidth={2.5} aria-label="Trusted badge" aria-hidden="false" />
                  <span className="text-[9px] sm:text-[10px] font-semibold text-amber-700 dark:text-amber-300">Trusted</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1 leading-snug max-w-md">
                Real-time precious metals pricing & market insights
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
