/**
 * End-of-article author bio box. Renders only once a real, verified author is
 * configured in utils/authors.ts (hasNamedAuthor()); otherwise renders nothing,
 * so no placeholder identity is ever shown.
 */

import Link from 'next/link';
import { PRIMARY_AUTHOR, hasNamedAuthor } from '@/utils/authors';

export default function AuthorBioBox({ className = '' }: { className?: string }) {
  if (!hasNamedAuthor()) return null;

  return (
    <section
      aria-label="About the author"
      className={`mb-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 card-shadow ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-amber-700 dark:text-amber-400">
            {PRIMARY_AUTHOR.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-0.5">
            About the author
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            <Link
              href={`/author/${PRIMARY_AUTHOR.slug}`}
              className="hover:text-amber-600 dark:hover:text-amber-400"
            >
              {PRIMARY_AUTHOR.name}
            </Link>
            <span className="font-normal text-slate-500 dark:text-slate-400"> — {PRIMARY_AUTHOR.role}</span>
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {PRIMARY_AUTHOR.bio}
          </p>
        </div>
      </div>
    </section>
  );
}
