/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bhaktistore.sajadvertising.com',
        pathname: '/wp-content/**',
      },
    ],
  },
}

export default nextConfig
