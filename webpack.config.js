module.exports = {
  entry: [ 'whatwg-fetch', './src/background.js' ],
  output: {
    path: './build',
    filename: 'background.js',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
};
