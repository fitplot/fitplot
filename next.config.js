module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
      })
    );
    return config;
  },
  generateBuildId: async () =>
    process.env.GIT_SHA ? process.env.GITHUB_SHA.slice(-8) : 'development',
};
