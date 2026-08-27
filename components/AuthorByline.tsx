/**
 * Compact article/guide byline: "By <author> · <role> · Updated <date>".
 * Reads from utils/authors.ts. Shows a verified named person once configured,
 * otherwise the honest "MetalView Editorial Desk" label (never a fake name).
 */

import Link from 'next/link';
import { Calendar, UserRound } from 'lucide-react';
import { PRIMARY_AUTHOR, LAST_REVIEWED, getBylineName, hasNamedAuthor } from '@/utils/authors';

interface AuthorBylineProps {
  /** ISO date string; defaults to the site-wide last-reviewed date. */
  updated?: string;
  className?: string;
}

export default function AuthorByline({ updated = LAST_REVIEWED, className = '' }: AuthorBylineProps) {
  const named = hasNamedAuthor();
  const dateStr = (() => {
    try {
      return new Date(updated).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return null;
    }
  })();

  return (
    <div
      className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400 ${className}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <UserRound className="w-4 h-4" aria-hidden="true" />
        <span>
          By{' '}
          {named ? (
            <Link
              href={`/author/${PRIMARY_AUTHOR.slug}`}
              className="font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
            >
              {getBylineName()}
            </Link>
          ) : (
            <span className="font-medium text-slate-700 dark:text-slate-300">{getBylineName()}</span>
          )}
          {named && <span className="text-slate-500 dark:text-slate-400"> · {PRIMARY_AUTHOR.role}</span>}
        </span>
      </span>
      {dateStr && (
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          Updated {dateStr}
        </span>
      )}
    </div>
  );
}
