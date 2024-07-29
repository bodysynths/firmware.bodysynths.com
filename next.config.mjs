/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/body-synths-firmware" : undefined;

const nextConfig = {
  distDir: "build",
  output: "export",
  assetPrefix: basePath,
  basePath: basePath,

  env: {
    NEXT_PUBLIC_GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
  },
};

export default nextConfig;
