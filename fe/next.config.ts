import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['aidnara-ai-be'],
  webpack(config) {
    config.resolve.modules.push(`${process.cwd()}/node_modules`);
    return config;
  },
};

export default nextConfig;
