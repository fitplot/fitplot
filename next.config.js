const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
      }),
    );
    return config;
  },
  /*
   * GITHUB_SHA is an available environment variable in GitHub Actions
   * https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
   */
  generateBuildId: async () =>
    process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : 'development',
};

// Allow running the API locally in development without the api gateway.
if (process.env.NODE_ENV !== 'production') {
  nextConfig.rewrites = async () => {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:3030/api/:path*`,
      },
    ];
  };
}

const sentryWebpackOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Don't supress output for source map uploading
  silent: false,

  org: 'fitplot',
  project: 'fitplot',

  // Only create releases and upload source maps for deploys on Fly.io
  dryRun: !process.env.FLY,
};

const sentryNextjsOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Don't transpile SDK to be compatible with IE11 (which increases bundle size)
  transpileClientSDK: false,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
};

module.exports = withSentryConfig(
  nextConfig,
  sentryWebpackOptions,
  sentryNextjsOptions,
);
