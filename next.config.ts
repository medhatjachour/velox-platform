import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config to silence the warning
  // Turbopack handles most things automatically
  turbopack: {},
  
  // Keep webpack config for production builds (Next.js may fallback to webpack)
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle canvas for server-side PDF parsing
      config.externals = config.externals || [];
      config.externals.push('canvas');
    }
    
    // Ensure pdfjs-dist worker files are available
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist/build/pdf.worker.mjs': 'pdfjs-dist/build/pdf.worker.min.mjs',
    };
    
    return config;
  },
};

export default nextConfig;
