/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Use export mode for static site generation on Netlify
  output: 'export',
  
  // Disable image optimization for Netlify compatibility
  images: {
    unoptimized: true,
    domains: ['netlify.app'],
  },
  
  // Ensure static assets are properly handled
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  
  // Add trailing slash for better compatibility
  trailingSlash: true,
  
  // Disable server actions for static export
  experimental: {
    serverActions: false,
  },
}

export default nextConfig
