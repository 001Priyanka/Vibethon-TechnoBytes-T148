/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'mongodb', 'bcryptjs'],
  },
}

module.exports = nextConfig