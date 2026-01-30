'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200/80 dark:border-gray-800/80 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            MetalView
          </p>
          <nav className="flex flex-wrap justify-center gap-4 text-xs">
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Home
            </Link>
            <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Blog
            </Link>
          </nav>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-2xl">
            <strong className="text-gray-700 dark:text-gray-300">Disclaimer:</strong> Prices are
            indicative, derived from international spot markets, and for informational purposes only.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>Not financial advice</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
