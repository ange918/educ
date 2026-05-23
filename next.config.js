/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*.janeway.replit.dev', '*.replit.dev', '*.replit.app'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

module.exports = nextConfig
