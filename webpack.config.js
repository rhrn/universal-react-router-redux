'use strict';

const path = require('path');
const webpack = require('webpack');

const ENV = process.env.NODE_ENV || 'development';

let devtool = 'eval'
let plugins = [], loaders = []

if (ENV === 'production') {

  plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]

  loaders = ['babel']

  devtool = 'source-map'

} else {

  plugins = [
    new webpack.HotModuleReplacementPlugin()
  ]

  loaders = ['react-hot', 'babel']

}

module.exports = {
  devtool: devtool,
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders,
      include: path.join(__dirname, 'src')
    }]
  }
}
