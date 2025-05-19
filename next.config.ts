import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
    ],
    unoptimized: true, // This ensures all images are served as-is
  },
  // Ensure static files are properly handled
  output: 'standalone',
};

export default nextConfig;
