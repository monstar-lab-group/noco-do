/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Explicitly set output to export for Netlify static site generation
  output: 'export',
  
  // Disable image optimization for Netlify compatibility
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Disable server components for static export
  experimental: {
    appDir: true,
  },
  
  // Ensure content directory is included in the build
  distDir: '.next',
}

export default nextConfig
