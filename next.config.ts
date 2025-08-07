import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
        // or for newer Next.js versions (recommended):
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.queridopueblo.net',
            port: '',
            pathname: '/public**',
          },
        ],
      },
};

export default nextConfig;
