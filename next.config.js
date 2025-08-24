const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.svg"],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Prevent excessive cache growth
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
        maxMemoryGenerations: 1,
      };
      
      // Set cache size limits
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
