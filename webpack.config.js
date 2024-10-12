const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/bundle.ts',
  target: ['web', 'es6'],
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'findr.js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
