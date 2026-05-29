import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
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
