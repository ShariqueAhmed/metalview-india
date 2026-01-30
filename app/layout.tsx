import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'MetalView - Live Gold Prices in India | 24K & 22K Gold Rate Today',
    template: '%s | MetalView'
  },
  description: 'Get live gold prices in India for 24K and 22K gold. Check today\'s gold rate per gram in Delhi, Mumbai, Bangalore, and other cities. Real-time gold price updates with historical trends.',
  keywords: [
    'gold price in india',
    'gold rate today',
    '24k gold price',
    '22k gold price',
    'gold price per gram',
    'gold rate delhi',
    'gold rate mumbai',
    'gold rate bangalore',
    'live gold prices',
    'gold price today',
    'gold rate in india',
    'gold price 1 gram',
    'gold price 10 gram',
    'gold price tola',
    'precious metal prices'
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
    title: 'MetalView - Live Gold Prices in India | 24K & 22K Gold Rate Today',
    description: 'Get live gold prices in India for 24K and 22K gold. Check today\'s gold rate per gram in major cities. Real-time updates with historical trends.',
    siteName: 'MetalView',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'MetalView - Live Gold Prices in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MetalView - Live Gold Prices in India',
    description: 'Get live gold prices in India for 24K and 22K gold. Check today\'s gold rate per gram.',
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
