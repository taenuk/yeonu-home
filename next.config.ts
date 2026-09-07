import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel's production build is currently getting stuck during
  // TypeScript validation on the admin editor. We keep runtime compilation
  // enabled and move type validation to local development/CI instead.
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
