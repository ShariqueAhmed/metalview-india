/**
 * FAQ Schema Component
 * Generates FAQPage structured data for SEO
 */

'use client';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  metal?: 'gold' | 'silver' | 'copper' | 'platinum' | 'palladium';
  city?: string;
}

export default function FAQSchema({ faqs, metal = 'gold', city }: FAQSchemaProps) {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : 'India';
  const metalName = metal.charAt(0).toUpperCase() + metal.slice(1);

  // Default FAQs if none provided
  const defaultFAQs: FAQItem[] = [
    {
      question: `What is the current ${metalName} price in ${cityName}?`,
      answer: `The current ${metalName} price in ${cityName} is updated in real-time on our platform. Prices change frequently based on market conditions, so check our live price tracker for the most accurate rates.`,
    },
    {
      question: `How is ${metalName} price calculated?`,
      answer: `${metalName} prices are determined by various factors including international market rates, currency exchange rates, local demand and supply, import duties, and making charges. Prices are typically quoted per gram or per 10 grams.`,
    },
    {
      question: `What affects ${metalName} prices?`,
      answer: `${metalName} prices are influenced by global market trends, economic indicators, inflation rates, currency fluctuations, geopolitical events, and local market demand. International commodity exchanges like MCX also play a significant role.`,
    },
    {
      question: `Is ${metalName} a good investment?`,
      answer: `${metalName} has historically been considered a safe haven asset and a hedge against inflation. However, investment decisions should be based on your financial goals, risk tolerance, and market conditions. Consult with a financial advisor for personalized advice.`,
    },
    ...(metal === 'gold' ? [
      {
        question: 'What is the difference between 24K and 22K gold?',
        answer: '24K gold is 99.9% pure gold, while 22K gold contains 91.6% gold and 8.4% other metals (usually copper or silver). 24K is purer but softer, while 22K is more durable and commonly used in jewelry. Prices differ based on purity.',
      },
    ] : []),
  ];

  const faqData = faqs.length > 0 ? faqs : defaultFAQs;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
