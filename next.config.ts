import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export optimization
  output: process.env.VERCEL ? undefined : "standalone",
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  
  // Powered by header for security
  poweredByHeader: false,
  
  // Compress responses
  compress: true,
  
  // Strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
