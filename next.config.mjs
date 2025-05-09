/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Use standard output mode for Netlify
  // output: 'export', // Removed as it's incompatible with API routes
  
  // Disable image optimization for Netlify compatibility
  images: {
    unoptimized: true,
    domains: ['netlify.app'],
  },
  
  // Ensure static assets are properly handled
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  
  // Add trailing slash for better compatibility
  trailingSlash: true,
}

export default nextConfig
