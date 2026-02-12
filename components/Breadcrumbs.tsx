/**
 * Breadcrumb Navigation Component
 * Provides visual breadcrumb navigation with schema support
 */

'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  // Ensure Home is first item
  const breadcrumbItems: BreadcrumbItem[] = items[0]?.href === '/' 
    ? items 
    : [{ label: 'Home', href: '/' }, ...items];

  // Generate structured data for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: typeof window !== 'undefined' 
        ? `${window.location.origin}${item.href}`
        : `https://metalview.in${item.href}`,
    })),
  };

  return (
    <>
      <nav 
        aria-label="Breadcrumb" 
        className={`mb-4 ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1 sm:gap-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isHome = item.href === '/';

            return (
              <li 
                key={index} 
                className="flex items-center"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <ChevronRight 
                    className="w-4 h-4 mx-1 sm:mx-2 text-slate-400 dark:text-slate-500 flex-shrink-0" 
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span 
                    className="text-slate-900 dark:text-slate-50 font-medium"
                    itemProp="name"
                    aria-current="page"
                  >
                    {isHome && <Home className="w-4 h-4 inline-block mr-1" aria-hidden="true" />}
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors flex items-center gap-1"
                    itemProp="item"
                  >
                    {isHome && <Home className="w-4 h-4" aria-hidden="true" />}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
      
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
