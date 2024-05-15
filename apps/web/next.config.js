/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
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
