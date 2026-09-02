import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',

  allowedDevOrigins: ['192.168.1.6', 'localhost:3000'],

  experimental: {
    sri: {
      algorithm: 'sha256',
    },
  },
};

export default nextConfig;
