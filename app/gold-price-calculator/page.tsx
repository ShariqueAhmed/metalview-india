/**
 * Gold Price Calculator page (/gold-price-calculator)
 * Interactive tool + editorial explainer on how a headline gold rate becomes a
 * final bill in India. Indexed, unique, high-utility page.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoldPriceCalculator from '@/components/GoldPriceCalculator';
import { getSiteUrl } from '@/utils/siteUrl';
import { formatIndianCurrency } from '@/utils/conversions';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Gold Price Calculator India: Estimate the Final Bill (24K/22K/18K) | MetalView India',
  description:
    'Free gold price calculator for India. Enter weight, purity, and making charges to estimate the final bill including 3% GST. Uses the live gold benchmark.',
  keywords: [
    'gold price calculator',
    'gold calculator india',
    'gold jewellery price calculator',
    'gold making charges calculator',
    'gold gst calculator',
    '22k gold price calculator',
    'gold rate calculator per gram',
  ],
  openGraph: {
    title: 'Gold Price Calculator India: Estimate the Final Bill | MetalView',
    description:
      'Turn the live gold rate into an estimated final bill — metal value, making charges, and 3% GST for 24K, 22K, and 18K.',
    type: 'website',
    locale: 'en_IN',
    url: '/gold-price-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Calculator India',
    description: 'Estimate the final gold bill with making charges and GST.',
  },
  alternates: {
    canonical: '/gold-price-calculator',
  },
};

interface GoldRates {
  rate24k: number | null;
  rate22k: number | null;
  rate18k: number | null;
  updatedAt: string | null;
}

async function fetchGoldRates(): Promise<GoldRates> {
  try {
    const baseUrl = getSiteUrl();
    const res = await fetch(`${baseUrl}/api/metals?city=mumbai`, {
      next: { revalidate: 600 },
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      return {
        rate24k: data.gold_1g ?? null,
        rate22k: data.gold_22k_1g ?? null,
        rate18k: data.gold_18k_1g ?? null,
        updatedAt: data.updated_at ?? null,
      };
    }
  } catch (error) {
    console.error('Error fetching gold rates for calculator:', error);
  }
  return { rate24k: null, rate22k: null, rate18k: null, updatedAt: null };
}

const FAQS = [
  {
    question: 'How is the final gold price calculated in India?',
    answer:
      'The final price is the metal value (rate per gram × weight for your chosen purity) plus making charges, plus 3% GST on that subtotal. Wastage, hallmarking, and dealer premium can add further to the invoice.',
  },
  {
    question: 'What are typical making charges on gold jewellery?',
    answer:
      'Making charges commonly range from about 8% to 25% of the metal value, depending on design complexity, whether the piece is machine-made or handcrafted, and the seller. Simple coins and bars carry little or no making charge; intricate jewellery is at the higher end.',
  },
  {
    question: 'How much GST is charged on gold in India?',
    answer:
      'A 3% GST currently applies to the value of gold jewellery, calculated on the metal value plus making charges. This calculator adds 3% by default, and you can switch it off to see the pre-tax subtotal.',
  },
  {
    question: 'Is the calculator’s total the exact amount I will pay?',
    answer:
      'No. It is an indicative estimate to help you sanity-check a quote. The exact bill depends on the seller’s live rate, how they quote making charges (per gram vs percentage), wastage, and any premium. Always confirm the final invoice before paying.',
  },
  {
    question: 'Which gold rate does the calculator use?',
    answer:
      'By default it uses the live 24K, 22K, and 18K benchmark. You can also type a custom rate per gram in the override field to match a specific dealer quote and recalculate the bill.',
  },
];

export default async function GoldPriceCalculatorPage() {
  const baseUrl = getSiteUrl();
  const rates = await fetchGoldRates();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Gold Price Calculator India',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${baseUrl}/gold-price-calculator`,
    description:
      'Interactive calculator to estimate the final gold bill in India from the live benchmark, including making charges and 3% GST.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: { '@type': 'Organization', name: 'MetalView India' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const sampleRate = rates.rate22k ?? (rates.rate24k != null ? rates.rate24k * 0.916 : null);
  const sampleMetal = sampleRate != null ? sampleRate * 10 : null;
  const sampleMaking = sampleMetal != null ? sampleMetal * 0.1 : null;
  const sampleGst = sampleMetal != null && sampleMaking != null ? (sampleMetal + sampleMaking) * 0.03 : null;
  const sampleTotal =
    sampleMetal != null && sampleMaking != null && sampleGst != null
      ? sampleMetal + sampleMaking + sampleGst
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Gold Price Calculator', href: '/gold-price-calculator' },
            ]}
          />

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Gold Price Calculator (India)
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              A headline gold rate is only the starting point. Use this calculator to estimate what
              you will actually pay for 24K, 22K, or 18K gold once making charges and 3% GST are
              added — and to sanity-check a jeweller’s quote before you buy.
            </p>
          </div>

          {/* Calculator */}
          <div className="mb-10">
            <GoldPriceCalculator
              rate24k={rates.rate24k}
              rate22k={rates.rate22k}
              rate18k={rates.rate18k}
              city="Mumbai"
              lastUpdated={rates.updatedAt}
            />
          </div>

          {/* How the bill is built */}
          <section className="mb-10 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              How a Gold Bill Is Built in India
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Retail gold pricing stacks up in four layers. Understanding each one is the difference
              between comparing quotes fairly and getting surprised at the counter.
            </p>
            <ol className="space-y-4">
              <li className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1">1. Metal value</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The live rate for your purity, multiplied by weight. A 24K rate is for near-pure
                  gold; 22K is about 91.6% of it and 18K about 75%, so always match the rate to the
                  purity you are actually buying.
                </p>
              </li>
              <li className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1">2. Making charges</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The fabrication cost, quoted either as a percentage of metal value or a flat amount
                  per gram. Intricate, handcrafted jewellery costs more to make than plain coins or
                  bars. This is the most negotiable line on the bill.
                </p>
              </li>
              <li className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1">3. GST (3%)</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Applied to the metal value plus making charges. It is a fixed statutory rate, so it
                  is not something to negotiate — but it does mean a higher making charge also raises
                  the tax you pay.
                </p>
              </li>
              <li className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1">4. Wastage &amp; premium</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Some sellers add wastage or a design premium separately. Ask whether these are
                  already included in the making charge so you are comparing like with like.
                </p>
              </li>
            </ol>
          </section>

          {/* Worked example */}
          {sampleTotal != null && sampleRate != null && (
            <section className="mb-10 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Worked Example: 10g of 22K Gold
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Using today’s live 22K benchmark of about {formatIndianCurrency(sampleRate)} per gram
                and a 10% making charge:
              </p>
              <dl className="space-y-2 text-sm max-w-md">
                <div className="flex justify-between">
                  <dt className="text-slate-600 dark:text-slate-400">Metal value (10g)</dt>
                  <dd className="font-medium text-slate-900 dark:text-slate-50">{formatIndianCurrency(sampleMetal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600 dark:text-slate-400">Making charges (10%)</dt>
                  <dd className="font-medium text-slate-900 dark:text-slate-50">{formatIndianCurrency(sampleMaking)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600 dark:text-slate-400">GST (3%)</dt>
                  <dd className="font-medium text-slate-900 dark:text-slate-50">{formatIndianCurrency(sampleGst)}</dd>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2">
                  <dt className="font-semibold text-slate-900 dark:text-slate-50">Estimated total</dt>
                  <dd className="font-bold text-amber-600 dark:text-amber-400">{formatIndianCurrency(sampleTotal)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                Figures update with the live benchmark and are indicative only.
              </p>
            </section>
          )}

          {/* FAQ */}
          <section className="mb-10 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Gold Price Calculator FAQs
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.question} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">{faq.question}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="mb-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 card-shadow">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Keep Reading</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <Link href="/gold" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Live gold price</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">See today’s 24K/22K/18K benchmark with history and trends.</p>
              </Link>
              <Link href="/gold-price-guide" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Gold price guide</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">How rates are set, and what to check before buying.</p>
              </Link>
              <Link href="/24k-vs-22k-vs-18k-gold" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">24K vs 22K vs 18K</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Which purity fits investment vs jewellery.</p>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
