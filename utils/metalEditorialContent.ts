/**
 * Long-form editorial copy for metal hub pages (/gold, /silver, etc.).
 * Kept separate so each metal can stay unique without bloating the client component.
 *
 * Content is intentionally India-specific and evergreen: it explains how each
 * benchmark is built and how to use it, rather than quoting volatile figures
 * that would date quickly. Every metal gets distinct sections so the hub pages
 * are genuinely unique rather than name-swapped templates.
 */

import type { MetalType } from '@/components/MetalTabs';

export interface MetalEditorialSection {
  heading: string;
  paragraphs: string[];
}

export interface MetalEditorialContent {
  title: string;
  intro: string;
  sections: MetalEditorialSection[];
  guideLinks: Array<{ href: string; label: string }>;
}

const CONTENT: Record<MetalType, MetalEditorialContent> = {
  gold: {
    title: 'How to Read Gold Prices in India',
    intro:
      'Indian gold shopping mixes a global metal market with local jewellery retail habits. The benchmark on this page is a reference rate—usually shown per 10 grams for a given purity—not the final amount on a jewellery invoice. Understanding that gap is the difference between comparing shops fairly and chasing a misleading headline number.',
    sections: [
      {
        heading: 'How India’s gold rate is actually built',
        paragraphs: [
          'India imports the large majority of its gold, so the price you see locally is not set in isolation. It starts from the international spot price (quoted in US dollars per troy ounce), gets converted into rupees at the prevailing USD/INR exchange rate, and then has import duty and other levies added before it reaches a domestic benchmark. This is why the local rate can move even on a day when the global price looks flat—a weaker rupee alone can push Indian gold higher.',
          'On top of that landed cost, individual cities and dealers apply their own small premiums based on demand, competition, and logistics. When you compare a rate here with a shop board, you are really comparing a clean benchmark against a number that already carries a seller’s premium.',
        ],
      },
      {
        heading: 'Benchmark rate versus jewellery bill',
        paragraphs: [
          'A typical jewellery bill stacks several lines: metal value based on purity and weight, making or fabrication charges, possible wastage policies, GST, and sometimes stone or design premiums. Two shops can show similar “today’s gold rate” cards and still produce very different final bills if making charges differ. Making charges are where a lot of the real cost hides—ask whether they are a flat rate or a percentage, because a percentage charge scales up sharply on heavier pieces.',
          'Coins and bars usually track the metal line more closely, but they still carry mint or dealer premiums. Always ask whether the quoted figure is per gram or per 10 grams, and which purity (24K, 22K, or 18K) it refers to before you convert anything in your head.',
        ],
      },
      {
        heading: 'Purity choices that change the decision',
        paragraphs: [
          '24K (about 99.9% pure) is the investment-oriented purity for coins and bars. 22K (about 91.6%) dominates traditional Indian jewellery because the alloy is more durable for daily wear. 18K (75% pure) is common in diamond-set and international-style pieces where design and stones matter as much as metal content.',
          'Comparing a 22K ornament quote with a 24K coin rate without adjusting for purity is one of the most common buyer mistakes. A 22K price should be roughly 91.6% of the equivalent 24K rate before making charges—if a quote is far off that ratio, ask why.',
        ],
      },
      {
        heading: 'Hallmarking and what the HUID actually proves',
        paragraphs: [
          'Since the phased rollout of mandatory hallmarking, most gold jewellery sold by registered jewellers carries a BIS mark, a purity grade, and a six-digit alphanumeric HUID (Hallmark Unique Identification). Treat hallmarking as a consumer-protection tool, not decoration: it certifies the stated purity so you are not paying a 22K price for a lower-purity alloy.',
          'Before you pay, check that the invoice purity language matches the physical hallmark, and keep the bill. Hallmarking protects the metal content; it does not cap making charges or guarantee a good buy-back rate, so those still need to be negotiated separately.',
        ],
      },
      {
        heading: 'Different ways to own gold',
        paragraphs: [
          'Physical jewellery carries the highest making charges and the widest buy/sell spread, but it is the form most Indian households actually want. Coins and bars keep you closer to the metal value. Beyond physical gold, digital gold, gold ETFs, and gold savings schemes let you hold exposure without storage risk, each with its own costs, liquidity, and tax treatment.',
          'The right form depends on whether your goal is adornment, gifting, or pure investment. Use the benchmark on this page to sense-check any of these against the underlying metal rate, and read the guides below before committing to a specific product.',
        ],
      },
      {
        heading: 'What to verify before you pay',
        paragraphs: [
          'Confirm hallmarking where applicable, invoice purity language, making-charge structure (percentage versus flat), GST treatment, and buy-back or exchange policies. City differences can reflect local demand and dealer practice; they are not always a “cheaper city” signal you can arbitrage without travel and verification costs.',
          'MetalView’s gold hub is for orientation: today’s rate, recent history, and links into deeper guides. Your seller’s written quote remains the commercial offer you should negotiate against.',
        ],
      },
    ],
    guideLinks: [
      { href: '/gold-price-guide', label: 'Gold Price Guide' },
      { href: '/24k-vs-22k-vs-18k-gold', label: '24K vs 22K vs 18K' },
      { href: '/blog/how-to-calculate-gold-price', label: 'How to Calculate Gold Price' },
      { href: '/blog/gold-hallmark-explained', label: 'Gold Hallmark Explained' },
    ],
  },
  silver: {
    title: 'How to Read Silver Prices in India',
    intro:
      'Silver in India sits between jewellery retail, household savings habits, and industrial demand. The live rate on this page is commonly shown per kilogram, with gram conversions for smaller purchases. As with gold, the benchmark is a market reference—not a promise that every jeweller or dealer will match it line-for-line.',
    sections: [
      {
        heading: 'Why silver has two personalities',
        paragraphs: [
          'Silver is unusual because it is both a precious metal and an industrial input. A large share of global silver demand comes from industry—solar panels, electronics, and electrical contacts—alongside its role in coins, bars, and jewellery. That dual identity is why silver often moves more sharply than gold: it reacts to investment sentiment and to the manufacturing cycle at the same time.',
          'For an Indian buyer, the practical takeaway is that silver’s day-to-day swings can be wider in percentage terms. A move that would be dramatic for gold can be an ordinary session for silver, so context from the history table matters more here.',
        ],
      },
      {
        heading: 'Per-kilogram quotes and smaller buys',
        paragraphs: [
          'Many Indian silver references use ₹ per kilogram because wholesale and investment conversations happen at that scale. Jewellery and small gifts are still sold by gram or by piece. Convert carefully, and ask the seller which unit their board rate uses before you multiply.',
          'Silver jewellery and articles often include making charges and design premiums that dwarf tiny day-to-day moves in the metal rate. For gift purchases such as utensils or idols, craftsmanship and finish can matter more than chasing the last ₹50 on the kilogram quote.',
        ],
      },
      {
        heading: 'The gold-to-silver ratio as a sense check',
        paragraphs: [
          'Long-term investors often watch the gold-to-silver ratio—how many grams of silver equal one gram of gold in price. It is not a timing signal on its own, but an unusually high or low ratio is a prompt to ask whether silver looks cheap or expensive relative to gold rather than in isolation.',
          'You do not need to trade on the ratio to benefit from it. Simply knowing roughly where it sits helps you frame whether today’s silver rate is a routine level or a stretched one.',
        ],
      },
      {
        heading: 'Jewellery versus investment framing',
        paragraphs: [
          'If you are buying silver for adornment or gifting, evaluate purity marks, workmanship, and return policies the way you would for any retail product. If you are buying for metal exposure, prefer transparent weight, purity, and buy-back terms, and be sceptical of ornate pieces sold primarily as “investments.”',
          'Bars and standard coins keep you closest to the metal value; heavily worked articles carry a premium you are unlikely to recover on resale. Decide which goal you are optimising for before you walk in.',
        ],
      },
      {
        heading: 'Practical checks before purchase',
        paragraphs: [
          'Ask for purity, weight, making charges, taxes, and whether the quoted rate already includes any premium. Keep invoices. For larger bars or coins, confirm authenticity practices and storage plans. MetalView’s silver guides expand on investment framing; this hub keeps the live rate and recent trend in one place.',
        ],
      },
    ],
    guideLinks: [
      { href: '/silver-investment-guide', label: 'Silver Investment Guide' },
      { href: '/gold-vs-silver-investment', label: 'Gold vs Silver Investment' },
      { href: '/blog/silver-price-trends-india-2026', label: 'Silver Price Trends' },
    ],
  },
  copper: {
    title: 'How to Read Copper Prices in India',
    intro:
      'Copper is primarily an industrial and infrastructure metal. Retail jewellery-style shopping habits do not map cleanly onto copper the way they do for gold. The benchmark on this page is useful for tracking market direction and planning—not as a consumer “shop rate” for ornaments.',
    sections: [
      {
        heading: 'Industrial benchmark, not a jewellery board',
        paragraphs: [
          'Copper prices in India are commonly discussed per kilogram and are influenced by global commodity markets, domestic industrial demand, currency moves, and supply conditions. Fabricators, contractors, and businesses watching input costs use these references differently from household precious-metal buyers.',
          'If you are comparing supplier quotes, align units (kg vs tonne), grade or form (cathode, scrap categories, finished products), delivery terms, and taxes. A headline copper number without those details is incomplete.',
        ],
      },
      {
        heading: 'What actually drives the copper price',
        paragraphs: [
          'Copper is set on global exchanges, with the London Metal Exchange as the primary reference, and the Indian price broadly follows that lead once you account for the rupee and local premiums. The biggest swing factors are the health of global manufacturing, construction and power-grid demand, mine supply disruptions, and inventory levels in exchange warehouses.',
          'Because copper is used across construction, wiring, motors, and electronics, its price is often read as a proxy for economic activity—commentators nickname it “Dr. Copper” for its habit of reflecting the broader growth cycle. For a business, that means a rising copper trend can signal both higher input costs and stronger end demand at the same time.',
        ],
      },
      {
        heading: 'Reading a supplier quote sensibly',
        paragraphs: [
          'A usable copper quote specifies the form (cathode, rod, wire, or scrap grade), the unit, the delivery point, payment terms, and applicable taxes. Scrap categories in particular are priced at a discount to refined cathode, so “copper price” means very different things depending on what is actually changing hands.',
          'Use the benchmark here to judge whether a supplier’s number looks current or stale, then let the written commercial terms govern the deal.',
        ],
      },
      {
        heading: 'Volatility and decision context',
        paragraphs: [
          'Copper can move with global growth expectations and manufacturing cycles. Short-term swings on a chart are not automatically a reason to rush a purchase; they are context for whether a supplier quote looks timely or stale relative to the market.',
          'MetalView shows an indicative India-facing copper benchmark and recent history so you can orient quickly. For contracts and bulk orders, confirm with your supplier’s written commercial terms.',
        ],
      },
    ],
    guideLinks: [
      { href: '/copper-price-guide', label: 'Copper Price Guide' },
      { href: '/blog/copper-price-india-guide-industrial-demand', label: 'Copper & Industrial Demand' },
      { href: '/methodology', label: 'Methodology' },
    ],
  },
  platinum: {
    title: 'How to Read Platinum Prices in India',
    intro:
      'Platinum is a precious metal with a thinner retail footprint in India than gold or silver. Benchmarks exist and are useful for tracking, but offline jewellery or dealer quotes can diverge more because liquidity, design premiums, and specialist retail channels differ from the mass gold market.',
    sections: [
      {
        heading: 'Thinner retail market, wider quote gaps',
        paragraphs: [
          'Treat the platinum rate on this page as an indicative reference, typically discussed in per-10-gram style units for Indian tracking. Specialist jewellers may price finished pieces with substantial design and brand components that dominate the metal line.',
          'Always confirm purity markings, weight, making charges, taxes, and buy-back policies in writing. Do not assume platinum “works like gold” in every shop’s invoice structure—resale networks for platinum are narrower, so the spread between buying and selling can be wider.',
        ],
      },
      {
        heading: 'Platinum versus gold for jewellery',
        paragraphs: [
          'Platinum is naturally white and is usually sold at high purity in jewellery, which appeals to buyers who want an understated, durable metal for daily-wear bands and settings. Unlike gold, platinum is not deeply embedded in Indian savings and gifting customs, so demand is more style-driven than investment-driven.',
          'That difference matters at resale. Gold jewellery has a dense buy-back ecosystem across the country; platinum resale is more specialised. If liquidity is important to you, factor that in before treating a platinum purchase as an investment.',
        ],
      },
      {
        heading: 'What moves the platinum price',
        paragraphs: [
          'Globally, platinum demand is tied heavily to industrial uses—particularly autocatalysts in diesel vehicles—alongside jewellery and investment. Supply is concentrated in a small number of producing regions, so mine disruptions and shifts in the vehicle market can move the price more than broad precious-metal sentiment.',
          'For an Indian reader, this means platinum does not always move in step with gold. Use this hub to see today’s reference and recent movement before speaking to a specialist dealer.',
        ],
      },
      {
        heading: 'Using the benchmark responsibly',
        paragraphs: [
          'If historical chart coverage is limited, that reflects market data availability—not an invitation to invent a trend. Prefer clear gaps over decorative fake history. Use our platinum guide when you need more context on how platinum differs from gold in use-cases and market behaviour.',
        ],
      },
    ],
    guideLinks: [
      { href: '/platinum-price-guide', label: 'Platinum Price Guide' },
      { href: '/blog/platinum-palladium-prices-india-guide', label: 'Platinum & Palladium Prices' },
      { href: '/methodology', label: 'Methodology' },
    ],
  },
  palladium: {
    title: 'How to Read Palladium Prices in India',
    intro:
      'Palladium is primarily known for industrial applications (notably automotive catalysts) and has a limited everyday retail jewellery presence in India compared with gold. The rate here is a tracking benchmark for readers following the metal—not a mass-market shop board.',
    sections: [
      {
        heading: 'An industrial metal first, a precious metal second',
        paragraphs: [
          'The bulk of palladium demand comes from catalytic converters in petrol-engine vehicles, where it helps reduce harmful emissions. That single end-use gives palladium a very different price character from gold: it tracks the automotive cycle and emissions regulation more than jewellery fashion or festival buying.',
          'For Indian readers, palladium is mostly something you track rather than shop for. Retail jewellery availability is limited, and when quotes do appear they can carry wide premiums.',
        ],
      },
      {
        heading: 'Why palladium can be so volatile',
        paragraphs: [
          'Palladium supply is concentrated in a handful of producing countries, and it is often mined as a by-product of other metals rather than for its own sake. That makes supply slow to respond to demand, so when the automotive market shifts, prices can swing hard and fast in either direction.',
          'Substitution adds another layer: because platinum and palladium can partially replace each other in some applications, a large price gap between the two can eventually pull demand from one to the other. Treat short chart windows cautiously and avoid reading a single sharp move as a durable trend.',
        ],
      },
      {
        heading: 'Using this page responsibly',
        paragraphs: [
          'MetalView’s palladium hub pairs an indicative live reference with editorial context and links to guides. It is not financial advice and not a guarantee of dealer availability. Align units carefully (often per 10 grams in consumer-facing trackers) and, for any actual purchase, insist on itemised metal-versus-fabrication pricing and clear documentation through specialist channels.',
          'If you need deeper background, open the palladium price guide and our methodology page for sourcing limits.',
        ],
      },
    ],
    guideLinks: [
      { href: '/palladium-price-guide', label: 'Palladium Price Guide' },
      { href: '/blog/platinum-palladium-prices-india-guide', label: 'Platinum & Palladium Prices' },
      { href: '/methodology', label: 'Methodology' },
    ],
  },
};

export function getMetalEditorialContent(metal: MetalType): MetalEditorialContent {
  return CONTENT[metal];
}
