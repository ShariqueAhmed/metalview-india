'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 bg-[#faf9f7] dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-transparent to-transparent dark:from-amber-950/20 pointer-events-none" aria-hidden />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-amber-200/25 to-transparent dark:from-amber-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="relative z-10 text-center max-w-md">
        <div className="inline-flex w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/40 border border-amber-200/80 dark:border-amber-700/50 items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" aria-hidden />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          Something went wrong
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-600 dark:to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4" aria-hidden />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
