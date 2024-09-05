/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // Keep your existing patterns
      {
        protocol: "https",
        hostname: "img.mreadercdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      // Add other patterns as needed
    ],
  },
  // ... other configurations
};

export default nextConfig;
