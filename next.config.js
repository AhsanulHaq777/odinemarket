/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {               //this is added in order to fix the sanity image src issue under next js Image tag
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
