import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js to compile all the necessary packages from your monorepo,
  // fixing the module and WebAssembly issues.
  transpilePackages: [
    "@meshsdk/midnight-react",
    "@meshsdk/midnight-wallet",
    "@meshsdk/midnight-core",
    "@midnight-ntwrk/midnight-js-http-client-proof-provider",
    "@midnight-ntwrk/ledger",
    "@midnight-ntwrk/onchain-runtime",
    "@midnight-ntwrk/compact-runtime",
    "@midnight-ntwrk/midnight-js-network-id",
  ],
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      // This enables Next.js's modern, native support for WebAssembly.
      asyncWebAssembly: true,     
      layers: true, 
    };    

    // This is the crucial part. It forces Webpack to treat .wasm files
    // as assets to be copied, not code to be parsed. This prevents
    // the "parseVec" error.
    config.module.rules.push({
      test: /\.wasm$/i,
      type: "webassembly/async",
    });

    // This return statement is critical.
    return config;
  },
};

export default nextConfig;
