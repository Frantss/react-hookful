const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const defaultWebpackConfig = require('../../webpack.default.config');
const { resolve } = require('path');

module.exports = {
  ...defaultWebpackConfig,
  plugins: [...defaultWebpackConfig.plugins, new BundleAnalyzerPlugin()],
  output: {
    ...defaultWebpackConfig.output,
    path: resolve(__dirname, 'dist'),
  },
};
