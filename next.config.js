/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_EC2_HOST: process.env.EC2_HOST || '16.59.210.149',
    NEXT_PUBLIC_EC2_PORT: process.env.EC2_PORT || '9000',
  }
}

module.exports = nextConfig
