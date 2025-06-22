import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "www.howsweeteats.com",
      "www.eatingwell.com",
      "cdn.loveandlemons.com",
      "loveandgoodstuff.com",
      "veganhuggs.com",
      "images.immediate.co.uk",
      "www.metro.ca",
      "res.cloudinary.com",
    ], // Add your image domains here
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
