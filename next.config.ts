import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "*": [
      "./public/**/*",
      "./.git/**/*",
      "./node_modules/.cache/**/*",
    ],
  },
};

export default nextConfig;
