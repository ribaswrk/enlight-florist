import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // FOR LOCAL TEST
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.rri.co.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.quipper.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "asset.kompas.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-enlightflorist.cloud",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
