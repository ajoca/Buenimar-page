import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Suppress service worker preload warnings in development
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  
  // Asegurar que todas las versiones usen la canónica https://www.buenimarcolonia.com
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
