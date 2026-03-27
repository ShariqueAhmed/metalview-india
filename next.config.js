/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 301 redirect legacy gold city URLs to canonical metal/city format
  async redirects() {
    return [
      {
        source: '/gold-price-today-in-:city',
        destination: '/gold/price-in/:city',
        permanent: true,
      },
    ];
  },
  env: {
    METALS_API_KEY: process.env.METALS_API_KEY,
  },
  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'metalview.in',
      },
    ],
  },
  // Avoid custom webpack optimization in dev: deterministic chunk/module IDs
  // can leave stale references in .next after HMR → "Cannot find module './682.js'".
  // If dev feels flaky, run: npm run dev:fresh
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ['recharts', 'lucide-react'],
  },
  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

module.exports = nextConfig
