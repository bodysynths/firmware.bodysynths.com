/** @type {import('next').NextConfig} */

// const isProd = process.env.NODE_ENV === "production";
// const basePath = isProd ? "/body-synths-firmware" : "";

// console.log("NEXT_PUBLIC_BASE_PATH: ", process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig = {
  distDir: "build",
  output: "export",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      console.log(
        "NEXT_PUBLIC_BASE_PATH from next.config.js: ",
        process.env.NEXT_PUBLIC_BASE_PATH
      );
    }
    return config;
  },
};

export default nextConfig;
