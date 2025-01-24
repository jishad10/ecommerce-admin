/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add other domains as needed
    deviceSizes: [320, 420, 768, 1024, 1200], // Define commonly used breakpoints for responsive images
    formats: ['image/avif', 'image/webp'], // Enable modern image formats for better performance
  },

  // ESLint settings
  eslint: {
    ignoreDuringBuilds: true, // Prevent build from failing due to ESLint errors
  },

  // React strict mode
  reactStrictMode: true, // Enable React strict mode for highlighting potential issues

  // TypeScript settings
  typescript: {
    ignoreBuildErrors: false, // Ensure TypeScript errors are not ignored during builds
  },

  // Experimental features (use only if needed)
  experimental: {
    appDir: true, // Enable the `app/` directory for Next.js 13+ features
  },

  // Webpack configuration (extend if needed)
  webpack: (config: any) => {
    // Example: Add custom rules or plugins
    return config;
  },
};

export default nextConfig;
