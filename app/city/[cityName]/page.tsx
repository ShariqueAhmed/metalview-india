/**
 * City-Specific Overview Page
 * Shows all metal prices for a specific city
 * SEO-optimized page at /city/[cityName]
 */

import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CombinedGoldPriceSection from '@/components/CombinedGoldPriceSection';
import SilverPriceSection from '@/components/SilverPriceSection';
import CopperPriceSection from '@/components/CopperPriceSection';
import PlatinumPriceSection from '@/components/PlatinumPriceSection';
import PalladiumPriceSection from '@/components/PalladiumPriceSection';
import GoldWeightPrices from '@/components/GoldWeightPrices';
import ChartSection from '@/components/ChartSection';
import { formatCityName } from '@/utils/conversions';
import { getCityLatitude, getCityLongitude } from '@/utils/cityCoordinates';
import Link from 'next/link';
import { TrendingUp, MapPin, Store, MapPin as LocationIcon } from 'lucide-react';
import CityNavigationClient from './CityNavigationClient';
import FAQSection from '@/components/FAQSection';
import FAQSchema from '@/components/FAQSchema';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';

interface CityPageProps {
  params: Promise<{ cityName: string }>;
}

// Top Indian cities for static generation
const TOP_CITIES = [
  'mumbai',
  'delhi',
  'bangalore',
  'kolkata',
  'chennai',
  'hyderabad',
  'pune',
  'ahmedabad',
  'jaipur',
  'surat',
  'lucknow',
  'kanpur',
  'nagpur',
  'indore',
  'thane',
  'bhopal',
  'visakhapatnam',
  'patna',
  'vadodara',
  'ghaziabad',
];

const CITY_INSIGHTS: Record<string, string> = {
  mumbai: 'Mumbai is one of India\'s most influential bullion and commodities hubs, so local price discovery tends to be faster and dealer competition is usually stronger than in smaller cities.',
  delhi: 'Delhi combines traditional trading areas with large organised retail demand, which means quoted rates can differ depending on neighbourhood, product type, and seller positioning.',
  bangalore: 'Bangalore has a broad mix of jewellery demand, investment-minded buyers, and digitally aware consumers, making it a useful city for comparing retail and investment behavior.',
  kolkata: 'Kolkata has long-established jewellery and bullion networks, and local dealer relationships still influence how rates and premiums are quoted to end buyers.',
  chennai: 'Chennai is a major jewellery market with active branded retail and strong seasonal buying patterns, so benchmark metal rates and final showroom prices do not always move in lockstep.',
  hyderabad: 'Hyderabad combines traditional jewellery demand with active modern retail, which makes comparison shopping and bill-level transparency especially important.',
  pune: 'Pune benefits from western India trading links while maintaining its own active jewellery and investment market, which helps keep local quotes competitive.',
  ahmedabad: 'Ahmedabad has a steady precious-metals market where buyers often compare multiple dealer quotes, making price transparency a meaningful local factor.',
  jaipur: 'Jaipur has a strong jewellery tradition and a tourism-facing retail market, so design premiums and craftsmanship can matter as much as benchmark metal movement.',
  surat: 'Surat is closely connected to wider trading and manufacturing networks, so business demand and commodity sentiment often shape how prices are discussed locally.',
};

// Popular markets and dealers by city
const CITY_MARKETS: Record<string, Array<{ name: string; description: string; type: 'market' | 'area' | 'dealer' }>> = {
  mumbai: [
    { name: 'Zaveri Bazaar', description: 'One of India\'s most prominent jewellery and bullion markets, known for high trading activity and strong price discovery', type: 'market' },
    { name: 'Bharat Diamond Bourse', description: 'Major trading hub with international connections that influences wider precious-metals sentiment in the city', type: 'market' },
    { name: 'Opera House', description: 'Popular area for jewellery shopping with numerous certified dealers and established retail brands', type: 'area' },
  ],
  delhi: [
    { name: 'Chandni Chowk', description: 'Historic jewellery market with traditional shops, active trading, and highly variable quote styles', type: 'market' },
    { name: 'Karol Bagh', description: 'Popular shopping area with many jewellery stores, showrooms, and certified dealers', type: 'area' },
    { name: 'Dariba Kalan', description: 'Well-known Old Delhi bullion and jewellery market with deep silver and traditional retail links', type: 'market' },
  ],
  bangalore: [
    { name: 'Commercial Street', description: 'Popular shopping area with multiple jewellery retailers and modern product mixes', type: 'area' },
    { name: 'Jayanagar', description: 'Established residential-commercial zone with long-running dealers and competitive retail pricing', type: 'area' },
    { name: 'MG Road', description: 'Main commercial corridor with branded stores and certified jewellers', type: 'area' },
  ],
  kolkata: [
    { name: 'Bowbazar', description: 'Historic jewellery market with traditional craftsmanship and strong local dealer networks', type: 'market' },
    { name: 'Bara Bazaar', description: 'One of Kolkata\'s oldest trading districts, relevant for bullion and wider commodity activity', type: 'market' },
    { name: 'New Market', description: 'Popular shopping area with multiple jewellery stores and retail comparison options', type: 'area' },
  ],
  chennai: [
    { name: 'T. Nagar', description: 'Major jewellery shopping district with dense showroom competition and strong seasonal demand', type: 'area' },
    { name: 'Mount Road', description: 'Commercial area with certified jewellers and modern retail brands', type: 'area' },
    { name: 'Mylapore', description: 'Traditional neighbourhood with established jewellers and strong festive shopping relevance', type: 'area' },
  ],
  hyderabad: [
    { name: 'Charminar', description: 'Famous area for traditional jewellery retail with heavy local footfall and varied pricing styles', type: 'area' },
    { name: 'Abids', description: 'Popular shopping area with multiple jewellery stores and comparison opportunities', type: 'area' },
    { name: 'Banjara Hills', description: 'Upscale area with branded jewellery stores and premium positioning', type: 'area' },
  ],
  pune: [
    { name: 'Tulsi Baug', description: 'Traditional market area with active jewellery retail and price-sensitive buyers', type: 'market' },
    { name: 'FC Road', description: 'Popular shopping street with modern jewellery stores and urban retail demand', type: 'area' },
    { name: 'Camp Area', description: 'Commercial area with established certified jewellers', type: 'area' },
  ],
  ahmedabad: [
    { name: 'Manek Chowk', description: 'Well-known jewellery market with longstanding dealer relationships and active local trade', type: 'market' },
    { name: 'Law Garden', description: 'Popular area with jewellery retailers and steady city demand', type: 'area' },
    { name: 'CG Road', description: 'Commercial corridor with modern jewellery stores and branded retail', type: 'area' },
  ],
  jaipur: [
    { name: 'Johari Bazaar', description: 'Historic jewellery market known for traditional craftsmanship and tourist-facing retail', type: 'market' },
    { name: 'Tripolia Bazaar', description: 'Long-running market area with jewellery trade across multiple metal categories', type: 'market' },
    { name: 'MI Road', description: 'Main commercial area with established jewellery stores and city retail demand', type: 'area' },
  ],
  surat: [
    { name: 'Varachha Road', description: 'Major diamond, jewellery, and trading area with strong business-linked demand', type: 'area' },
    { name: 'Mahidharpura', description: 'Historic market area connected to jewellery and bullion trade', type: 'market' },
    { name: 'Adajan', description: 'Residential-commercial area with established jewellery dealers', type: 'area' },
  ],
};

function getCityOverviewFaqs(city: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: `How should I use this ${city} metal price page?`,
      answer: `Use the ${city} city page as a benchmark overview before checking a metal-specific route. It helps you compare how gold, silver, copper, platinum, and palladium are moving locally before you evaluate a final dealer or supplier quote.`,
    },
    {
      question: `Why can final metal quotes in ${city} differ from the rates shown here?`,
      answer: `The rates on this page are benchmark prices. In ${city}, the final payable amount may vary because of purity, unit size, fabrication or making charges, GST, supplier margins, transport costs, and product availability.`,
    },
    {
      question: `Which metals on this ${city} page are most relevant for retail buyers?`,
      answer: `Gold and silver are usually the most relevant for jewellery and household buying. Copper, platinum, and palladium are still useful to track, but they are often more important for industry, niche retail demand, or market context than for mainstream consumer purchases in ${city}.`,
    },
  ];
}

function getCityPageChecklist(city: string): string[] {
  return [
    `Use ${city} as your local benchmark, then compare the final quote you receive against the live rate shown here.`,
    'For jewellery purchases, separate purity, making charges, GST, and stones or extras before comparing offers.',
    'For industrial or non-jewellery metals, treat the page as market context rather than a direct retail quote.',
  ];
}

// Generate static params for top cities
export async function generateStaticParams() {
  return TOP_CITIES.map((city) => ({
    cityName: city,
  }));
}

// Force dynamic rendering to avoid build-time fetch issues
export const dynamic = 'force-dynamic';
export const revalidate = 600; // Revalidate every 10 minutes

// Generate metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { cityName } = await params;
  if (!cityName || typeof cityName !== 'string') {
    return {
      title: 'City Metal Prices | MetalView India',
      description: 'Get live metal prices for cities in India',
    };
  }
  const city = formatCityName(cityName);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  return {
    title: `Live Metal Prices in ${city} - Gold, Silver, Copper, Platinum | MetalView India`,
    description: `Get live metal prices in ${city}, India. Check today's gold, silver, copper, platinum, and palladium rates. Real-time updates with historical trends and market insights.`,
    keywords: [
      `metal prices in ${city.toLowerCase()}`,
      `gold price in ${city.toLowerCase()}`,
      `silver price in ${city.toLowerCase()}`,
      `copper price in ${city.toLowerCase()}`,
      `platinum price in ${city.toLowerCase()}`,
      `${city.toLowerCase()} metal rates`,
      `live prices ${city.toLowerCase()}`,
    ],
    openGraph: {
      title: `Live Metal Prices in ${city} | MetalView India`,
      description: `Get live metal prices in ${city}, India. Check today's rates for all metals.`,
      type: 'website',
      locale: 'en_IN',
      siteName: 'MetalView India',
      url: `${baseUrl}/city/${cityName}`,
      images: [
        {
          url: `${baseUrl}/api/og?city=${cityName}`,
          width: 1200,
          height: 630,
          alt: `Metal prices in ${city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Live Metal Prices in ${city} | MetalView India`,
      description: `Get live metal prices in ${city}, India.`,
      images: [`${baseUrl}/api/og?city=${cityName}`],
    },
    alternates: {
      canonical: `/city/${cityName}`,
    },
  };
}

export default async function CityOverviewPage({ params }: CityPageProps) {
  const { cityName } = await params;

  if (!cityName || typeof cityName !== 'string') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Invalid City
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The requested city page could not be found.
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors inline-block"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const city = formatCityName(cityName);

  // Fetch data server-side
  let data = null;
  try {
    // Use relative URL for server-side fetch (works in both dev and production)
    const apiUrl = `/api/metals?city=${encodeURIComponent(cityName)}`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    });

    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const cityInsight = CITY_INSIGHTS[cityName.toLowerCase()] || `Metal prices in ${city} are influenced by local market demand, transportation costs, and regional economic factors.`;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';
  const cityLatitude = getCityLatitude(cityName);
  const cityLongitude = getCityLongitude(cityName);

  // Generate LocalBusiness schema for city pages
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `MetalView - ${city} Metal Prices`,
    description: `Live metal prices in ${city}, India. Real-time pricing for Gold, Silver, Copper, Platinum, and Palladium.`,
    url: `${baseUrl}/city/${cityName}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: 'IN',
    },
    ...(cityLatitude && cityLongitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: cityLatitude,
            longitude: cityLongitude,
          },
        }
      : {}),
    areaServed: {
      '@type': 'City',
      name: city,
      containedIn: {
        '@type': 'Country',
        name: 'India',
      },
    },
  };

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Metal Prices in ${city}`,
    description: `Live metal prices in ${city}, India. Check today's rates for Gold, Silver, Copper, Platinum, and Palladium.`,
    url: `${baseUrl}/city/${cityName}`,
    mainEntity: {
      '@type': 'City',
      name: city,
      containedIn: {
        '@type': 'Country',
        name: 'India',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: city,
          item: `${baseUrl}/city/${cityName}`,
        },
      ],
    },
  };

  return (
    <>
      {/* WebPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* LocalBusiness structured data for local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cities', href: '/cities' },
              { label: city, href: `/city/${cityName}` },
            ]}
          />

          {/* SEO Content Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800 flex-shrink-0 shadow-md">
                <MapPin className="w-6 h-6 text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Live Metal Prices in {city}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                  Real-time prices for Gold, Silver, Copper, Platinum, and Palladium
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  This page shows live metal rates in {city} so you can compare gold, silver, copper, platinum, and palladium prices in one place. Use the city selector to switch locations, and click any metal below or in the links at the bottom for detailed rates and history. Prices are indicative; verify with local dealers before buying.
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  The goal of this page is to help you understand the local market picture, not just the number. Different metals matter to different users in {city}: jewellery buyers, savers, traders, and industrial users will all read these prices differently.
                </p>
                {data?.updated_at && (
                  <LastUpdated date={data.updated_at} />
                )}
              </div>
            </div>
          </div>

          {/* City Selector */}
          <div className="mb-8 flex justify-end">
            <CityNavigationClient
              cities={TOP_CITIES}
              selectedCity={cityName}
            />
          </div>

          {/* Gold Prices Section */}
          {data && (data.gold_10g || data.gold_1g) && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Gold Prices
                </h2>
              </div>
              <CombinedGoldPriceSection
                gold24k_10g={data.gold_10g}
                gold22k_10g={data.gold_22k_10g}
                gold18k_10g={data.gold_18k_10g}
                gold24k_1g={data.gold_1g}
                gold22k_1g={data.gold_22k_1g}
                gold18k_1g={data.gold_18k_1g}
                gold24k_difference={data.gold_24k_difference}
                gold22k_difference={data.gold_22k_difference}
                gold18k_difference={data.gold_18k_difference}
                gold24k_percentage={data.gold_24k_percentage}
                gold22k_percentage={data.gold_22k_percentage}
                gold18k_percentage={data.gold_18k_percentage}
              />
              {data.gold_10g && (
                <div className="mt-6">
                  <GoldWeightPrices
                    goldPrice10g={data.gold_10g}
                    goldPrice1g={data.gold_1g}
                    gold22kPrice10g={data.gold_22k_10g}
                    gold22kPrice1g={data.gold_22k_1g}
                    gold18kPrice10g={data.gold_18k_10g}
                    gold18kPrice1g={data.gold_18k_1g}
                  />
                </div>
              )}
            </div>
          )}

          {/* Silver Prices Section */}
          {data?.silver_1kg && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Silver Prices
                </h2>
              </div>
              <SilverPriceSection
                price1kg={data.silver_1kg}
                price1g={data.silver_1g}
                percentageChange={data.silverPercentageChange}
              />
            </div>
          )}

          {/* Copper Prices Section */}
          {data?.copper_1kg && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Copper Prices
                </h2>
              </div>
              <CopperPriceSection
                price1kg={data.copper_1kg}
                price100g={data.copper_100g}
                percentageChange={data.copperPercentageChange}
              />
            </div>
          )}

          {/* Platinum Prices Section */}
          {data?.platinum_10g && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Platinum Prices
                </h2>
              </div>
              <PlatinumPriceSection
                price1g={data.platinum_1g ?? data.platinum ?? null}
                price10g={data.platinum_10g ?? null}
                percentageChange={data.platinumPercentageChange}
                variationType={data.platinumVariationType}
                variation={data.platinumVariation}
              />
            </div>
          )}

          {/* Palladium Prices Section */}
          {data?.palladium_10g && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Palladium Prices
                </h2>
              </div>
              <PalladiumPriceSection
                price1g={data.palladium_1g}
                price10g={data.palladium_10g}
                percentageChange={data.palladiumPercentageChange}
                variationType={data.palladiumVariationType}
                variation={data.palladiumVariation}
              />
            </div>
          )}

          {/* Historical Trends Chart */}
          {data && (
            <div className="mb-8">
              <ChartSection
                goldData={data.goldTrend}
                silverData={data.silverTrend}
                copperData={data.copperTrend}
              />
            </div>
          )}

          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              How to Use the {city} City Page
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Use this page when you want a single-city snapshot before opening a metal-specific page. It works best as a comparison hub: you can see whether gold and silver look steady, whether copper is moving sharply, and whether niche metals like platinum or palladium are worth deeper review.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Once you know which metal matters to you, the metal-specific city pages give you better context on history, pricing structure, and buying considerations. This page is the overview; the detailed decision support lives one click deeper.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">
                  Quick checklist
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  {getCityPageChecklist(city).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* City Market Insights */}
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Market Insights for {city}
            </h2>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-slate-600 dark:text-slate-400 mb-4">{cityInsight}</p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                In {city}, benchmark metal rates usually move with national and global trends, but the final quote you receive can still differ by product category, supplier type, urgency, and local competition. The chart above helps you separate broad market movement from city-level retail variation.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                For most readers, the most important distinction is between benchmark movement and final buying cost. The benchmark rate helps you understand direction. The actual bill depends on what you are buying, how it is quoted, and how competitive the local market is on that day.
              </p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Key Factors Affecting Prices
              </h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                <li>Local demand and supply dynamics</li>
                <li>Transportation and logistics costs</li>
                <li>Dealer margins and making charges</li>
                <li>Local taxes and government policies</li>
                <li>Regional economic conditions</li>
                <li>Proximity to major trading hubs</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400">
                Prices on this page are for reference only. Actual dealer rates may include making charges, taxes, and premiums. Always confirm with your jeweller or broker before making a purchase.
              </p>
            </div>
          </div>

          {/* Popular Markets and Dealers */}
          {(() => {
            const cityMarkets = CITY_MARKETS[cityName.toLowerCase()];
            return cityMarkets && cityMarkets.length > 0 && (
              <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center border-2 border-amber-200 dark:border-amber-800">
                    <Store className="w-5 h-5 text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    Popular Bullion & Jewellery Markets in {city}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cityMarkets.map((market, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <LocationIcon className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">
                          {market.name}
                        </h3>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 mb-2">
                          {market.type === 'market' ? 'Market' : market.type === 'area' ? 'Area' : 'Dealer'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {market.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            );
          })()}

          {/* City-Specific FAQs */}
          {(() => {
            const cityFaqs = getCityOverviewFaqs(city);
            return cityFaqs && cityFaqs.length > 0 && (
              <>
                <FAQSection
                  faqs={cityFaqs}
                title={`Frequently Asked Questions about Metal Prices in ${city}`}
              />
              <FAQSchema
                faqs={cityFaqs}
                metal="gold"
                city={cityName}
              />
            </>
            );
          })()}

          {/* Quick Links to Metal-Specific Pages */}
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              View Metal-Specific Prices
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <Link
                href={`/gold/price-in/${cityName}`}
                className="px-4 py-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg text-sm font-semibold text-amber-900 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors text-center"
              >
                Gold
              </Link>
              <Link
                href={`/silver/price-in/${cityName}`}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-900 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center"
              >
                Silver
              </Link>
              <Link
                href={`/copper/price-in/${cityName}`}
                className="px-4 py-3 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg text-sm font-semibold text-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors text-center"
              >
                Copper
              </Link>
              <Link
                href={`/platinum/price-in/${cityName}`}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
              >
                Platinum
              </Link>
              <Link
                href={`/palladium/price-in/${cityName}`}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
              >
                Palladium
              </Link>
            </div>
          </div>

          {/* Related Cities Section */}
          <section aria-labelledby="related-cities" className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 id="related-cities" className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Metal Prices in Other Cities
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Compare metal prices across major Indian cities. Prices may vary based on local demand, transportation costs, and regional market conditions.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {TOP_CITIES.filter((c) => c !== cityName).slice(0, 12).map((otherCity) => (
                <Link
                  key={otherCity}
                  href={`/city/${otherCity}`}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-800 hover:text-amber-700 dark:hover:text-amber-400 transition-all duration-200 text-center"
                >
                  {formatCityName(otherCity)}
                </Link>
              ))}
            </div>
          </section>

          {/* Related Metals Section */}
          <section aria-labelledby="other-metals" className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 id="other-metals" className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
              All Metal Prices in {cityName}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Explore prices for all precious and industrial metals in {cityName}. All prices are updated in real-time.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {['gold', 'silver', 'copper', 'platinum', 'palladium'].map((metal) => {
                const getMetalStyles = (metal: string) => {
                  switch (metal) {
                    case 'gold':
                      return 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-700';
                    case 'silver':
                      return 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700';
                    case 'copper':
                      return 'bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950/30';
                    case 'platinum':
                      return 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/30';
                    case 'palladium':
                      return 'bg-purple-50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-950/30';
                    default:
                      return 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                  }
                };
                
                return (
                  <Link
                    key={metal}
                    href={`/${metal}/price-in/${cityName.toLowerCase()}`}
                    className={`px-4 py-2.5 border rounded-lg text-sm font-medium transition-all duration-200 text-center ${getMetalStyles(metal)}`}
                  >
                    {metal.charAt(0).toUpperCase() + metal.slice(1)}
                  </Link>
                );
              })}
          </div>
          </section>

          {/* You May Also Like Section */}
          <YouMayAlsoLike
            currentCity={cityName}
            pageType="city"
          />

        </main>

        <Footer />
      </div>
    </>
  );
}
