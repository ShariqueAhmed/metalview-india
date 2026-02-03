/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    METALS_API_KEY: process.env.METALS_API_KEY,
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && dev) {
      // Improve HMR stability
      config.watchOptions = {
        poll: 1000, // Check for changes every 1 second
        aggregateTimeout: 300, // Delay before rebuilding
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      };
      
      // Fix chunk loading issues
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      };
      
      // Improve module resolution
      config.resolve = {
        ...config.resolve,
        symlinks: false,
        cacheWithContext: false,
      };
    }
    return config;
  },
  // Disable static optimization for API routes to prevent build issues
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig
