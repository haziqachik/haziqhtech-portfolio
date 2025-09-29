import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // keep your transpiled package
  transpilePackages: ["@haziq/ui"],

  // TEMPORARY safety nets during refactors (optional; remove later)
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
