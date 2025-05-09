/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['netlify.app'],
  },
  // Remove standalone output for Netlify compatibility
  // output: 'standalone',
  
  // Add trailing slash for better compatibility
  trailingSlash: true,
  
  // Ensure static assets are properly handled
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
}

export default nextConfig
