import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logged-assets.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
