/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: "localhost",
				port: "3001",
			},
		],
	},
};

export default nextConfig;
