/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/body-synths-firmware" : "";

console.log("NEXT_PUBLIC_BASE_PATH: ", process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig = {
  distDir: "build",
  output: "export",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

export default nextConfig;
