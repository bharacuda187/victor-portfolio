import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',

  // Local development access
  allowedDevOrigins: ['192.168.1.6', 'localhost:3000'],
};

export default nextConfig;
