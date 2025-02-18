import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // FOR LOCAL TEST
  images: {
    domains: ["cdn.rri.co.id", "www.quipper.com", "asset.kompas.com"], // Tambahkan hostname yang diperlukan
  },
};

export default nextConfig;
