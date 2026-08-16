/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Include views directory in serverless function bundles for Vercel
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./views/**'],
      '/students': ['./views/**'],
    },
  },
};

module.exports = nextConfig;
