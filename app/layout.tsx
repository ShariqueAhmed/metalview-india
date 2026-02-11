import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
  metadataBase: new URL('https://metalview.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://metalview.in',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://metalview.in" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}
      </head>
      <body className={inter.className}>
        {/* Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:shadow-lg"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
