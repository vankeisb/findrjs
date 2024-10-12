const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/bundle.ts',
  // devtool: 'inline-source-map',
  target: ['web', 'es6'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'findrjs.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        // exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
