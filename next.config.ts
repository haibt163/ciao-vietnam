import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Photos are already WebP. Skipping Vercel's optimizer avoids the Hobby
  // plan's 5,000 transformations / month, which would blank images with a 402.
  images: {
    unoptimized: true,
  },
  // Pin the app folder as the Turbopack root. Do not change this until a
  // Vercel build log shows the project root is correct. A folder above this
  // one also contains a package-lock.json. Without the pin, Next.js can treat
  // that parent folder as the app. The pin keeps the root here.
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
