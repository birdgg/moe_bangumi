/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{
      hostname: 'localhost',
      port: '3001',
    }]
  }
};

export default nextConfig;
