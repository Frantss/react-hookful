const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [new TerserPlugin()],
  },

  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader',
      },
    ],
  },

  plugins: [new CleanWebpackPlugin()],

  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      umd: 'react',
      amd: 'react',
    },
  },
};
