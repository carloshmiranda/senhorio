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
    root: '.',
  },
};

export default nextConfig;
