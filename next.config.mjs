/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable optimizations
  poweredByHeader: false,

  // Optimize images
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
