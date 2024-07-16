/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: process.env.NODE_ENV === "development" ? undefined : "export",
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
  images: {
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
