'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')
const port = 3011

config.entry.unshift(`webpack-dev-server/client?http://localhost:${port}/`, 'webpack/hot/only-dev-server')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
})
  .listen(port, 'localhost', (err, result) => {

    if (err) {
      return console.log(err)
    }

    console.log(`Listening at http://localhost:${port}/`)
  })
