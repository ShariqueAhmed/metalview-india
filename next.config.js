/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    METALS_API_KEY: process.env.METALS_API_KEY,
  },
}

module.exports = nextConfig
