import type { NextConfig } from "next";

const NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org', // Replace with the domain of the image source
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default NextConfig;