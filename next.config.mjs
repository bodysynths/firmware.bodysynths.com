/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/body-synths-firmware" : "";

const nextConfig = {
  distDir: "build",
  output: "export",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

export default nextConfig;
