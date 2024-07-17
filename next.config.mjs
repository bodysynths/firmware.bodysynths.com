/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  distDir: 'build',
  output: 'export',
}

export default nextConfig