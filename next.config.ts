import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Suppress service worker preload warnings in development
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  // Exclude large static asset directories from serverless function to stay under 250MB limit
  // Static files (PDFs, images) are served directly from Vercel CDN, not from functions
  outputFileTracingExcludes: {
    "/**": [
      "node_modules/@swc/core-win32-x64",
      "public/archivos/**/*",
    ],
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
