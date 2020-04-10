const path = require('path');

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  entry: './src/index.ts',

  output: {
    filename: 'index.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
