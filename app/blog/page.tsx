import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gold Price Blog - Latest News & Insights | MetalView',
  description: 'Stay updated with the latest gold price trends, market insights, and investment tips. Learn about gold purity, buying guides, and market analysis.',
  keywords: [
    'gold price news',
    'gold market trends',
    'gold investment tips',
    'gold buying guide',
    'gold price analysis',
    'precious metals blog',
  ],
  openGraph: {
    title: 'Gold Price Blog - Latest News & Insights | MetalView',
    description: 'Stay updated with the latest gold price trends and market insights.',
    url: 'https://metalview.in/blog',
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
  // General Posts
  {
    slug: 'understanding-gold-purity-24k-vs-22k',
    title: 'Understanding Gold Purity: 24K vs 22K - Which is Better?',
    excerpt: 'Learn the key differences between 24K and 22K gold, their uses, and which one is better for investment vs jewelry.',
    date: '2025-01-20',
    readTime: '5 min read',
    category: 'Education',
  },
  {
    slug: 'gold-price-trends-2025',
    title: 'Gold Price Trends 2025: What to Expect',
    excerpt: 'Analyze the current gold market trends and predictions for 2025. Understand factors affecting gold prices in India.',
    date: '2025-01-18',
    readTime: '7 min read',
    category: 'Market Analysis',
  },
  {
    slug: 'best-time-to-buy-gold',
    title: 'Best Time to Buy Gold: A Complete Guide',
    excerpt: 'Discover the optimal times to buy gold, seasonal patterns, and factors to consider before making your purchase.',
    date: '2025-01-15',
    readTime: '6 min read',
    category: 'Investment',
  },
  {
    slug: 'gold-investment-vs-jewelry',
    title: 'Gold Investment vs Jewelry: Making the Right Choice',
    excerpt: 'Compare gold investment options with jewelry purchases. Understand the pros and cons of each approach.',
    date: '2025-01-12',
    readTime: '8 min read',
    category: 'Investment',
  },
  {
    slug: 'how-to-calculate-gold-price',
    title: 'How to Calculate Gold Price: Complete Guide',
    excerpt: 'Learn how gold prices are calculated, understand making charges, and calculate the total cost of gold jewelry.',
    date: '2025-01-10',
    readTime: '6 min read',
    category: 'Education',
  },
  {
    slug: 'gold-hallmark-explained',
    title: 'Gold Hallmark Explained: What You Need to Know',
    excerpt: 'Understand gold hallmarking, BIS certification, and how to verify the purity of your gold purchases.',
    date: '2025-01-08',
    readTime: '5 min read',
    category: 'Education',
  },
  {
    slug: 'factors-affecting-gold-prices',
    title: 'Top 10 Factors Affecting Gold Prices in India',
    excerpt: 'Discover the key factors that influence gold prices including inflation, currency rates, demand, and global events.',
    date: '2025-01-05',
    readTime: '8 min read',
    category: 'Market Analysis',
  },
  {
    slug: 'gold-investment-strategies',
    title: 'Gold Investment Strategies for Beginners',
    excerpt: 'Learn proven strategies for investing in gold, from physical gold to digital gold and gold ETFs.',
    date: '2025-01-03',
    readTime: '7 min read',
    category: 'Investment',
  },
  // City-Specific Posts
  {
    slug: 'gold-price-in-delhi',
    title: 'Gold Price in Delhi Today: Complete Guide 2025',
    excerpt: 'Get the latest gold prices in Delhi, understand market trends, and find the best places to buy gold in the capital.',
    date: '2025-01-19',
    readTime: '6 min read',
    category: 'City Guide',
  },
  {
    slug: 'gold-price-in-mumbai',
    title: 'Gold Price in Mumbai: Market Analysis & Buying Tips',
    excerpt: 'Explore gold prices in Mumbai, understand the local market dynamics, and discover trusted gold dealers in the city.',
    date: '2025-01-17',
    readTime: '6 min read',
    category: 'City Guide',
  },
  {
    slug: 'gold-price-in-bangalore',
    title: 'Gold Price in Bangalore: Your Complete Guide',
    excerpt: 'Stay updated with gold prices in Bangalore. Learn about the best time to buy and top jewelry stores in the city.',
    date: '2025-01-16',
    readTime: '6 min read',
    category: 'City Guide',
  },
  {
    slug: 'gold-price-in-kolkata',
    title: 'Gold Price in Kolkata: Market Trends & Insights',
    excerpt: 'Get insights into gold prices in Kolkata, understand local market patterns, and find reliable gold sellers.',
    date: '2025-01-14',
    readTime: '6 min read',
    category: 'City Guide',
  },
  {
    slug: 'gold-price-in-chennai',
    title: 'Gold Price in Chennai: Complete Buying Guide',
    excerpt: 'Discover current gold prices in Chennai, learn about the best jewelry markets, and get tips for buying gold.',
    date: '2025-01-13',
    readTime: '6 min read',
    category: 'City Guide',
  },
  {
    slug: 'gold-price-in-hyderabad',
    title: 'Gold Price in Hyderabad: Market Overview 2025',
    excerpt: 'Stay informed about gold prices in Hyderabad. Explore the city gold market and get expert buying advice.',
    date: '2025-01-11',
    readTime: '6 min read',
    category: 'City Guide',
  },
  {
    slug: 'gold-price-in-pune',
    title: 'Gold Price in Pune: Trends & Best Places to Buy',
    excerpt: 'Get the latest gold prices in Pune, understand market trends, and discover trusted gold dealers in the city.',
    date: '2025-01-09',
    readTime: '6 min read',
    category: 'City Guide',
  },
  {
    slug: 'gold-price-in-ahmedabad',
    title: 'Gold Price in Ahmedabad: Complete Market Guide',
    excerpt: 'Explore gold prices in Ahmedabad, learn about local market dynamics, and find the best jewelry stores.',
    date: '2025-01-07',
    readTime: '6 min read',
    category: 'City Guide',
  },
  {
    slug: 'gold-price-in-jaipur',
    title: 'Gold Price in Jaipur: The Pink City Gold Market',
    excerpt: 'Discover gold prices in Jaipur, known for its rich jewelry heritage. Get insights into the local gold market.',
    date: '2025-01-06',
    readTime: '6 min read',
    category: 'City Guide',
  },
  {
    slug: 'gold-price-in-surat',
    title: 'Gold Price in Surat: Diamond City Gold Market',
    excerpt: 'Stay updated with gold prices in Surat. Learn about the city gold market and best buying practices.',
    date: '2025-01-04',
    readTime: '6 min read',
    category: 'City Guide',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Gold Price Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Latest insights, trends, and guides about gold prices and investments
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => post.category !== 'City Guide').map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200/80 dark:border-gray-800/80 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium rounded">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium text-sm"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">City-Specific Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => post.category === 'City Guide').map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200/80 dark:border-gray-800/80 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium text-sm"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
