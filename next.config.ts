import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'librivox.org',
      },
      {
        protocol: 'https',
        hostname: '**.librivox.org',
      },
      {
        protocol: 'https',
        hostname: 'www.archive.org',
      },
      {
        protocol: 'https',
        hostname: 'archive.org',
      },
    ],
  },
};

export default nextConfig;
