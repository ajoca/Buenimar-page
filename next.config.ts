import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Suppress service worker preload warnings in development
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
