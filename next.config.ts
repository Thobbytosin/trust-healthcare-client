import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      { hostname: "randomuser.me" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
