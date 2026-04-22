/**
 * Blog index listing (metadata for /blog cards). Single source of truth for
 * sitemap blog URLs — see utils/blogSitemapData.ts. Post bodies live in
 * app/blog/[slug]/page.tsx.
 */
export interface BlogIndexPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export const blogIndexPosts: BlogIndexPost[] = [
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
