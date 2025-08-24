const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Disable infrastructure logging
    config.infrastructureLogging = {
      level: "error",
    };

    return config;
  },
};

module.exports = nextConfig;
