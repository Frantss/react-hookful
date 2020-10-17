const defaultWebpackConfig = require('../../webpack.default.config');
const { resolve } = require('path');

module.exports = [
  {
    ...defaultWebpackConfig,
    output: {
      ...defaultWebpackConfig.output,
      path: resolve(__dirname, 'dist'),
    },
  },
];
