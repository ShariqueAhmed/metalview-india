'use client';

/**
 * Header Component
 * Displays logo, app name, subtitle, and nav (desktop inline / mobile menu)
 */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Shield, CheckCircle2, Menu, X } from 'lucide-react';

const METAL_LINKS = [
  { href: '/gold', label: 'Gold' },
  { href: '/silver', label: 'Silver' },
  { href: '/copper', label: 'Copper' },
  { href: '/platinum', label: 'Platinum' },
  { href: '/palladium', label: 'Palladium' },
];

const SECONDARY_LINKS = [
  { href: '/guides', label: 'Guides' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        relative px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950
        ${isActive
          ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
          : 'text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-amber-500 dark:bg-amber-400" aria-hidden />
      )}
    </Link>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-4 group focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:ring-offset-2 rounded-lg min-w-0"
            aria-label="MetalView India - Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-400/10 to-amber-600/20 dark:from-amber-300/30 dark:via-yellow-300/20 dark:to-amber-400/30 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" aria-hidden="true" />
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-500 flex items-center justify-center transition-all duration-300 group-hover:scale-105 border border-amber-300/50 dark:border-amber-500/50">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white dark:text-slate-900" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 dark:bg-emerald-400 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-lg" aria-hidden="true">
                  <CheckCircle2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="text-lg font-bold tracking-tight leading-tight sm:text-xl lg:text-2xl xl:text-3xl truncate">
                  <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400 bg-clip-text text-transparent">Metal</span>
                  <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 dark:from-slate-200 dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">View</span>
                  <span className="text-slate-900 dark:text-slate-50"> India</span>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border border-amber-200 dark:border-amber-800/50 rounded-full flex-shrink-0">
                  <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600 dark:text-amber-400" strokeWidth={2.5} aria-hidden="true" />
                  <span className="text-[9px] sm:text-[10px] font-semibold text-amber-700 dark:text-amber-300">Trusted</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-400 mt-0.5 leading-snug max-w-[180px] sm:max-w-md truncate sm:truncate-none">
                Real-time precious metals pricing
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
            <div className="flex items-center gap-0.5">
              {METAL_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} isActive={isActive(link.href)} />
              ))}
            </div>
            <span className="w-px h-5 mx-2 bg-slate-200 dark:bg-slate-700" aria-hidden />
            <div className="flex items-center gap-0.5">
              {SECONDARY_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} isActive={isActive(link.href)} />
              ))}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="sm:hidden flex items-center justify-center w-11 h-11 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 touch-manipulation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Mobile navigation">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 mb-2">
              Metals
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {METAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors touch-manipulation min-h-[44px] flex items-center ${
                    isActive(link.href)
                      ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700/50'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/50 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:border-amber-200 dark:hover:border-amber-800/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 mb-2">
              Resources
            </p>
            <div className="flex flex-col gap-0.5">
              {SECONDARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3.5 px-4 rounded-xl text-slate-700 dark:text-slate-300 font-medium touch-manipulation min-h-[48px] flex items-center transition-colors ${
                    isActive(link.href)
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-amber-600 dark:hover:text-amber-400 active:bg-slate-200 dark:active:bg-slate-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
