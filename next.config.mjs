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
  
  // Exclude dynamic API routes from static export
  // This prevents errors with dynamic routes during static export
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/admin': { page: '/admin' },
      // Add other static routes as needed
    };
  },
}

export default nextConfig
