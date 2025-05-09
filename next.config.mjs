/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Use server components for Netlify Functions compatibility
  // output: 'export',
  
  // Disable image optimization for Netlify compatibility
  images: {
    unoptimized: true,
    domains: ['netlify.app'],
  },
  
  // Ensure static assets are properly handled
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  
  // Static export configuration
  // Using trailingSlash and basePath for better compatibility
  trailingSlash: true,
  basePath: '',
}

export default nextConfig
