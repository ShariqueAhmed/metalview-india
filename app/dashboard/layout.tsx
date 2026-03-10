import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metal Price Dashboard - All Metals at a Glance | MetalView',
  description: 'View live gold, silver, platinum, and palladium prices in India in one place. Quick dashboard with buy/sell rates and daily variation.',
  openGraph: {
    title: 'Metal Price Dashboard | MetalView India',
    description: 'Live gold, silver, platinum, and palladium prices in one view.',
    type: 'website',
    locale: 'en_IN',
    url: '/dashboard',
  },
  alternates: {
    canonical: '/dashboard',
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
