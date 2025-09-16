import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // add local domain of orbstack for CORS
  allowedDevOrigins: ['127.0.0.1','*.orb.local', 'orb.local'],
  // Allow images from localhost
  images: {
    domains: ['localhost', '127.0.0.1'],
  },
};

export default nextConfig;
