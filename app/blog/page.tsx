import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { getSiteUrl } from '@/utils/siteUrl';

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'MetalView Blog - Metal Price Guides & Insights | MetalView',
  description: 'Expert articles on gold, silver, copper, platinum, and palladium in India—GST, SGBs, live rates, city guides, and market trends. Educational content for buyers and investors.',
  keywords: [
    'gold price news',
    'silver price india',
    'precious metals blog',
    'GST on gold jewelry india',
    'sovereign gold bonds india',
    'copper price india',
    'platinum price india',
    'metal investment tips',
    'live metal prices guide',
  ],
  openGraph: {
    title: 'MetalView Blog | Gold, Silver & Metal Price Guides',
    description: 'In-depth guides on gold, silver, copper, platinum, and palladium prices and policies in India.',
    url: `${SITE_URL}/blog`,
  },
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  { slug: 'silver-price-trends-india-2026', title: 'Silver Price Trends in India: What Drives the Market in 2026', excerpt: 'Understand how industrial demand, import duties, the US dollar, and festival season affect silver rates in India—and how to track live prices responsibly.', date: '2026-03-08', readTime: '8 min read', category: 'Market Analysis' },
  { slug: 'platinum-palladium-prices-india-guide', title: 'Platinum and Palladium Prices in India: A Practical Guide', excerpt: 'Learn how platinum and palladium are quoted in India, why they matter for jewelry and industry, and what to watch when comparing live rates.', date: '2026-03-07', readTime: '7 min read', category: 'Education' },
  { slug: 'sovereign-gold-bonds-vs-physical-gold-india', title: 'Sovereign Gold Bonds vs Physical Gold in India: Pros and Cons', excerpt: 'Compare SGBs with coins and jewelry: liquidity, safety, GST, interest, and who each option suits—without hype.', date: '2026-03-06', readTime: '9 min read', category: 'Investment' },
  { slug: 'gst-on-gold-jewelry-india-explained', title: 'GST on Gold Jewelry in India: What Buyers Should Know', excerpt: 'A plain-English overview of how GST applies to gold jewelry, making charges, and repairs—plus questions to ask at the counter.', date: '2026-03-05', readTime: '7 min read', category: 'Education' },
  { slug: 'copper-price-india-guide-industrial-demand', title: 'Copper Price in India: Why It Matters Beyond the Headline', excerpt: 'Copper links construction, power, and EV trends to everyday costs. Here is how Indian buyers and businesses can think about copper rates.', date: '2026-03-04', readTime: '6 min read', category: 'Market Analysis' },
  { slug: 'how-to-read-live-metal-prices-metalview', title: 'How to Read Live Metal Prices on MetalView (Step by Step)', excerpt: 'A transparent guide to using MetalView: metal hubs, city pages, last updated times, and how to interpret rates before you buy or invest.', date: '2026-03-03', readTime: '6 min read', category: 'Education' },
  { slug: 'understanding-gold-purity-24k-vs-22k', title: 'Understanding Gold Purity: 24K vs 22K - Which is Better?', excerpt: 'Learn the key differences between 24K and 22K gold, their uses, and which one is better for investment vs jewelry.', date: '2025-01-20', readTime: '5 min read', category: 'Education' },
  { slug: 'gold-price-trends-2025', title: 'Gold Price Trends 2025: What to Expect', excerpt: 'A practical look at gold price trends in 2025, the drivers behind them, and how Indian readers can think in scenarios instead of overconfident forecasts.', date: '2025-01-18', readTime: '7 min read', category: 'Market Analysis' },
  { slug: 'best-time-to-buy-gold', title: 'Best Time to Buy Gold: A Complete Guide', excerpt: 'Discover the optimal times to buy gold, seasonal patterns, and factors to consider before making your purchase.', date: '2025-01-15', readTime: '6 min read', category: 'Investment' },
  { slug: 'gold-investment-vs-jewelry', title: 'Gold Investment vs Jewelry: Making the Right Choice', excerpt: 'Compare gold investment options with jewelry purchases. Understand the pros and cons of each approach.', date: '2025-01-12', readTime: '8 min read', category: 'Investment' },
  { slug: 'how-to-calculate-gold-price', title: 'How to Calculate Gold Price: Complete Guide', excerpt: 'Learn how gold prices are calculated, understand making charges, and calculate the total cost of gold jewelry.', date: '2025-01-10', readTime: '6 min read', category: 'Education' },
  { slug: 'gold-hallmark-explained', title: 'Gold Hallmark Explained: What You Need to Know', excerpt: 'Understand gold hallmarking, BIS certification, and how to verify the purity of your gold purchases.', date: '2025-01-08', readTime: '5 min read', category: 'Education' },
  { slug: 'factors-affecting-gold-prices', title: 'Top 10 Factors Affecting Gold Prices in India', excerpt: 'Discover the key factors that influence gold prices including inflation, currency rates, demand, and global events.', date: '2025-01-05', readTime: '8 min read', category: 'Market Analysis' },
  { slug: 'gold-investment-strategies', title: 'Gold Investment Strategies for Beginners', excerpt: 'Learn proven strategies for investing in gold, from physical gold to digital gold and gold ETFs.', date: '2025-01-03', readTime: '7 min read', category: 'Investment' },
  { slug: 'gold-price-in-delhi', title: 'Gold Price in Delhi Today: Complete Guide 2025', excerpt: 'A practical Delhi buyer guide covering old-market versus showroom pricing, hallmark checks, making charges, and how to compare the full invoice fairly.', date: '2025-01-19', readTime: '6 min read', category: 'City Guide' },
  { slug: 'gold-price-in-mumbai', title: 'Gold Price in Mumbai: Market Analysis & Buying Tips', excerpt: 'A practical Mumbai buyer guide covering benchmark pricing, wholesale influence, hallmark checks, and how to compare the final bill instead of the headline rate.', date: '2025-01-17', readTime: '6 min read', category: 'City Guide' },
  { slug: 'gold-price-in-bangalore', title: 'Gold Price in Bangalore: Your Complete Guide', excerpt: 'A practical Bangalore buyer guide focused on benchmark rates, store comparison, hallmark checks, and clearer invoice evaluation.', date: '2025-01-16', readTime: '6 min read', category: 'City Guide' },
  { slug: 'gold-price-in-kolkata', title: 'Gold Price in Kolkata: Market Trends & Insights', excerpt: 'A practical Kolkata buyer guide covering craftsmanship premiums, hallmark checks, and how to compare traditional and modern jewellery quotes.', date: '2025-01-14', readTime: '6 min read', category: 'City Guide' },
  { slug: 'gold-price-in-chennai', title: 'Gold Price in Chennai: Complete Buying Guide', excerpt: 'Understand Chennai\'s jewellery market, seasonal demand, and how to compare purity, making charges, and full-bill quotes.', date: '2025-01-13', readTime: '6 min read', category: 'City Guide' },
  { slug: 'gold-price-in-hyderabad', title: 'Gold Price in Hyderabad: Market Overview 2025', excerpt: 'Compare traditional and premium Hyderabad gold markets with clearer guidance on hallmarking, invoice structure, and final buying cost.', date: '2025-01-11', readTime: '6 min read', category: 'City Guide' },
  { slug: 'gold-price-in-pune', title: 'Gold Price in Pune: Trends & Best Places to Buy', excerpt: 'A practical Pune buying guide focused on benchmark rates, store comparison, making charges, and cleaner invoice evaluation.', date: '2025-01-09', readTime: '6 min read', category: 'City Guide' },
  { slug: 'gold-price-in-ahmedabad', title: 'Gold Price in Ahmedabad: Complete Market Guide', excerpt: 'Learn how Ahmedabad buyers compare traditional jewellers and modern showrooms while tracking purity, making charges, and final value.', date: '2025-01-07', readTime: '6 min read', category: 'City Guide' },
  { slug: 'gold-price-in-jaipur', title: 'Gold Price in Jaipur: The Pink City Gold Market', excerpt: 'A Jaipur-focused guide to traditional craftsmanship, Kundan and Meenakari premiums, and how to compare design-led gold invoices.', date: '2025-01-06', readTime: '6 min read', category: 'City Guide' },
  { slug: 'gold-price-in-surat', title: 'Gold Price in Surat: Diamond City Gold Market', excerpt: 'See how Surat buyers can compare showroom quotes, making charges, and final billed value instead of relying on headline rates alone.', date: '2025-01-04', readTime: '6 min read', category: 'City Guide' },
];

function BlogCard({ post, variant }: { post: BlogPost; variant: 'default' | 'city' }) {
  const badgeClass = variant === 'city'
    ? 'bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-300 border-sky-200/60 dark:border-sky-700/50'
    : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-200/60 dark:border-amber-700/50';
  return (
    <article className="content-card metal-card-shine p-6 hover:shadow-lg dark:hover:shadow-amber-500/5 transition-all duration-300 group overflow-hidden">
                  <div className="flex items-center gap-2 mb-3">
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${badgeClass}`}>
                      {post.category}
                    </span>
                  </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
        <Link href={`/blog/${post.slug}`} className="focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded">
                    {post.title}
        </Link>
                  </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" aria-hidden />
          {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" aria-hidden />
          {post.readTime}
        </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:gap-3 transition-all"
                  >
                    Read more
        <ArrowRight className="w-4 h-4" aria-hidden />
                  </Link>
    </article>
  );
}

export default function BlogPage() {
  const mainPosts = blogPosts.filter((p) => p.category !== 'City Guide');
  const cityPosts = blogPosts.filter((p) => p.category === 'City Guide');

  return (
    <div className="page-bg">
      <div className="page-bg-ambient" aria-hidden />
      <Header />
      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200/60 dark:border-amber-700/40 px-3.5 py-1.5 mb-6 text-xs font-medium text-amber-800 dark:text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden />
            News & insights
                </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            <span className="home-hero-gradient">MetalView Blog</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Practical guides and market context for gold, silver, copper, platinum, and palladium buyers in India
          </p>
        </header>

        <section className="mb-10 content-card p-6 sm:p-7">
          <h2 className="section-title mb-4">What You&apos;ll Find Here</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Market context</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Articles that explain what is moving gold, silver, copper, platinum, and palladium prices in India beyond the headline number.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">Buyer education</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Practical guides on taxes, purity, hallmarking, price calculation, and how to compare real quotes from dealers or platforms.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">City-level perspective</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Localized explainers that help readers understand why pricing, demand, and buying behavior can differ across major Indian cities.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <article className="content-card p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-2">
              Editorial Focus
            </p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
              We aim to publish explainers, not filler
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              MetalView&apos;s blog is meant to make live-rate pages more useful. Instead of treating the daily price as the whole story, we cover the practical details that often determine whether a quote is actually attractive: purity, taxes, fabrication costs, local demand, trading behavior, and common comparison mistakes.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              If a topic affects how Indian readers buy, evaluate, or interpret metal prices, it belongs here. That includes educational basics for first-time buyers and more analytical pieces for readers following market trends responsibly.
            </p>
          </article>
          <aside className="content-card p-6 sm:p-7">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3">
              Start Here
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog/how-to-read-live-metal-prices-metalview" className="text-amber-600 dark:text-amber-400 hover:underline">
                  How to Read Live Metal Prices on MetalView
                </Link>
              </li>
              <li>
                <Link href="/blog/gst-on-gold-jewelry-india-explained" className="text-amber-600 dark:text-amber-400 hover:underline">
                  GST on Gold Jewelry in India
                </Link>
              </li>
              <li>
                <Link href="/blog/sovereign-gold-bonds-vs-physical-gold-india" className="text-amber-600 dark:text-amber-400 hover:underline">
                  Sovereign Gold Bonds vs Physical Gold
                </Link>
              </li>
              <li>
                <Link href="/blog/silver-price-trends-india-2026" className="text-amber-600 dark:text-amber-400 hover:underline">
                  Silver Price Trends in India
                </Link>
              </li>
            </ul>
          </aside>
        </section>

        <section className="mb-14">
          <h2 className="section-title mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainPosts.map((post) => (
              <BlogCard key={post.slug} post={post} variant="default" />
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title mb-6">City-Specific Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityPosts.map((post) => (
              <BlogCard key={post.slug} post={post} variant="city" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
