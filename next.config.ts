import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizeCss: true,   // 底层即调用 critters
  },
};

export default nextConfig;
