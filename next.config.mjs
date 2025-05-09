/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    NEXT_PUBLIC_ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
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
  // For Netlify deployment
  output: 'standalone',
}

export default nextConfig
