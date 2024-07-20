/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
};

// if (process.env.NODE_ENV === "development") {
//   nextConfig.rewrites = async () => {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "http://localhost:3001/api/:path*",
//       },
//     ];
//   };
// }

export default nextConfig;
