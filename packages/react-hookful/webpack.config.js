module.exports = {
  mode: 'production',

  devtool: 'source-map',

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

  externals: {
    react: 'React',
  },
};
