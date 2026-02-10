import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizeCss: true,   // 底层即调用 critters
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',   // 所有域名，极度宽松
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',  // 添加 http 支持
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
