import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import './globals.css';
import { Analytics } from './analytics';
import { getSiteUrl } from '@/utils/siteUrl';

/** Google Analytics 4 (gtag). Override with NEXT_PUBLIC_GA_MEASUREMENT_ID in env. */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-ZMRV17R3P2';
const SITE_URL = getSiteUrl();

// Optimize font loading with display swap to prevent FOIT (Flash of Invisible Text)
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Prevents invisible text during font load
  preload: true, // Preloads the font for faster rendering
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    default: 'MetalView - Live Metal Prices in India | Gold, Silver, Copper, Platinum',
    template: '%s | MetalView'
  },
  description: 'Get live metal prices in India - Gold, Silver, Copper, and Platinum. Check today\'s rates in Mumbai, Delhi, Bangalore, and other cities. Real-time price updates with historical trends.',
  keywords: [
    'metal price in india',
    'gold price in india',
    'silver price in india',
    'copper price in india',
    'platinum price in india',
    'gold rate today',
    'silver rate today',
    'live metal prices',
    'metal price today',
    'gold rate mumbai',
    'gold rate delhi',
    'precious metal prices',
    'industrial metal prices'
  ],
  authors: [{ name: 'MetalView' }],
  creator: 'MetalView',
  publisher: 'MetalView',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': SITE_URL,
      'en': SITE_URL,
      'x-default': SITE_URL,
      // Add Hindi language support when available
      // 'hi-IN': 'https://metalview.in/hi',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    title: 'MetalView - Live Metal Prices in India | Gold, Silver, Copper, Platinum',
    description: 'Get live metal prices in India - Gold, Silver, Copper, and Platinum. Check today\'s rates in major cities. Real-time updates with historical trends.',
    siteName: 'MetalView',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'MetalView - Live Metal Prices in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MetalView - Live Metal Prices in India',
    description: 'Get live metal prices in India - Gold, Silver, Copper, and Platinum. Check today\'s rates.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MetalView',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Canonical is set per-page via metadata alternates.canonical; do not add a static canonical here. */}
        {/* Hreflang tags for regional targeting */}
        <link rel="alternate" hrefLang="en-IN" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        {/* Add Hindi language support when available */}
        {/* <link rel="alternate" hrefLang="hi-IN" href="https://metalview.in/hi" /> */}
        
        {/* Resource Hints for Critical Resources - Optimized for Core Web Vitals */}
        
        {/* DNS Prefetch for external resources - Resolve DNS early */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href={SITE_URL} />
        
        {/* Preconnect to external domains - Establish connections early */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Prefetch critical API endpoints - Load in background for faster subsequent requests */}
        <link rel="prefetch" href="/api/metals" as="fetch" crossOrigin="anonymous" />
        <link rel="prefetch" href="/api/metals?city=mumbai" as="fetch" crossOrigin="anonymous" />
        <link rel="prefetch" href="/api/metals?city=delhi" as="fetch" crossOrigin="anonymous" />
        
        {/* Preload critical images - Load immediately for faster LCP */}
        <link rel="preload" href="/og-image.svg" as="image" type="image/svg+xml" />
        
        {/* Preload critical CSS - Already handled by Next.js, but explicit for clarity */}
        {/* Next.js automatically preloads CSS, but we can add explicit hints if needed */}
        
        {/* Mobile & PWA Meta Tags - Enhanced mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MetalView" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#f59e0b" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Geo & Location Meta Tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        
        {/* Google Verification */}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}
        
        {/* Google AdSense Account Verification */}
        <meta name="google-adsense-account" content="ca-pub-7313067850150544" />
        
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7313067850150544"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {/* Google tag (gtag.js) — one tag site-wide; loads after hydration */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-tag-gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        {/* Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:shadow-lg"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <VercelAnalytics />
        {children}
      </body>
    </html>
  );
}
