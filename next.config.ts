/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain here
  },
  eslint: {
    ignoreDuringBuilds: true,  // Disable ESLint for production builds
  },
};

export default nextConfig;
