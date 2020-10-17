const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const defaultConfig = require('../../webpack.default.config');

module.exports = {
  ...defaultConfig,
  plugins: [...defaultConfig.plugins, new BundleAnalyzerPlugin()],
};
