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
    // Disable caching temporarily to fix module resolution issues
    config.cache = false;

    // Disable infrastructure logging
    config.infrastructureLogging = {
      level: "error",
    };

    return config;
  },
};

module.exports = nextConfig;
