import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // FOR LOCAL TEST
  images: {
    domains: [
      "cdn.rri.co.id",
      "www.quipper.com",
      "asset.kompas.com",
      "pub-5bae22f15e114d2385439579e263b19e.r2.dev",
    ], // Tambahkan hostname yang diperlukan
  },
};

export default nextConfig;
