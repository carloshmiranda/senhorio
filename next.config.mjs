import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable optimizations
  poweredByHeader: false,

  // Optimize images
  images: {
    unoptimized: true,
  },

  // Fix turbopack root detection
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
