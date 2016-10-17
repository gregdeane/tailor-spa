const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:7777/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
