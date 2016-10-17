const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaders = require('./loaders/loaders.common');

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    app: './src/main.ts'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: loaders
  },
  sassLoader: {
    includePaths: ['./src/assets', './node_modules/bootstrap/scss']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
