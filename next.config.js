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
  /*
   * GITHUB_SHA is an available environment variable in GitHub Actions
   * https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
   */
  generateBuildId: async () =>
    process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(-7) : 'development',
};
