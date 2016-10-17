const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('../helpers');

module.exports = [
  {
    test: /\.ts$/,
    loaders: ['awesome-typescript-loader', 'angular2-template-loader']
  },
  {
    test: /\.html$/,
    loader: 'html'
  },
  {
    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
    loader: 'file?name=assets/[name].[hash].[ext]'
  },
  {
    test: /\.css$/,
    exclude: helpers.root('src', 'app'),
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
  },
  {
    test: /\.css$/,
    include: helpers.root('src', 'app'),
    loader: 'raw'
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    loaders: ['raw-loader', 'sass-loader']
  }
];
