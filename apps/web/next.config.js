/** @type {import('next').NextConfig} */
module.exports = {
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
