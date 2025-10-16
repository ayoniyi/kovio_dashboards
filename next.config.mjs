/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
