import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SuperMetal - Live Metal Prices in India | Gold, Silver, Copper, Platinum',
    template: '%s | SuperMetal'
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
  authors: [{ name: 'SuperMetal' }],
  creator: 'SuperMetal',
  publisher: 'SuperMetal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://supermetal.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://supermetal.in',
    title: 'SuperMetal - Live Metal Prices in India | Gold, Silver, Copper, Platinum',
    description: 'Get live metal prices in India - Gold, Silver, Copper, and Platinum. Check today\'s rates in major cities. Real-time updates with historical trends.',
    siteName: 'SuperMetal',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SuperMetal - Live Metal Prices in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuperMetal - Live Metal Prices in India',
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
        <link rel="canonical" href="https://supermetal.in" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
