import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = { 
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
    }; 

    return config;
  },
};

export default nextConfig;
