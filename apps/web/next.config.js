/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  transpilePackages: [""],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3200',
      },
    ],
  },
};
