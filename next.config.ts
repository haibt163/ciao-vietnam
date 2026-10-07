import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Photos are already WebP. Skipping Vercel's optimizer avoids the Hobby
  // plan's 5,000 transformations / month, which would blank images with a 402.
  images: {
    unoptimized: true,
  },
  // This sandbox has a lockfile in the parent folder. Pin the app root so
  // Turbopack does not treat that parent as the project.
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
