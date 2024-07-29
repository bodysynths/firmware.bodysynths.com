/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  distDir: "build",
  output: "export",
  assetPrefix: isProd ? "/static/" : undefined,
  basePath: isProd ? "/body-synths-firmware" : undefined,

  env: {
    NEXT_PUBLIC_GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
  },
};

export default nextConfig;
