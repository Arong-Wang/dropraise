import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  outputFileTracingExcludes: {
    "api/admin/**": [
      "./public/**/*",
      "./.git/**/*",
      "./node_modules/.cache/**/*",
    ],
  },
};

export default nextConfig;
