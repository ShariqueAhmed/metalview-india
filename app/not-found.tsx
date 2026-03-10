import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 bg-[#faf9f7] dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-transparent to-transparent dark:from-amber-950/20 pointer-events-none" aria-hidden />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-amber-200/25 to-transparent dark:from-amber-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="relative z-10 text-center max-w-md">
        <p className="text-6xl sm:text-8xl font-black tracking-tighter text-slate-200 dark:text-slate-800 select-none">
          404
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mt-4 mb-2">
          Page not found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-600 dark:to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl"
          >
            <Home className="w-4 h-4" aria-hidden />
            Go home
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-colors"
          >
            <Search className="w-4 h-4" aria-hidden />
            Browse guides
          </Link>
        </div>
      </div>
    </div>
  );
}
