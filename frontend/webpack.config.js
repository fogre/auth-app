const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  'mode': 'development',
  'entry': './src/index.js',
  'output': {
    'path': __dirname + '/build',
    'filename': 'bundle.js',
    'publicPath': '/'
  },
  'devtool': 'source-map',
  devServer: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001'
    },
    historyApiFallback: true,
  },
  'module': {
    'rules': [
      {
        'enforce': 'pre',
        'test': /\.js$/,
        'exclude': /node_modules/,
        'loader': 'eslint-loader',
        'options': {
          'emitWarning': true,
          'failOnError': false,
          'failOnWarning': false
        }
      },
      {
        'test': /\.(js|jsx)$/,
        'exclude': /node_modules/,
        'use': {
          'loader': 'babel-loader'
        }
      },
      {
        'test': /\.css$/,
        'use': [
          'style-loader',
          'css-loader'
        ]
      },
      {
        'test': /\.html$/,
        'use': [
          {
            'loader': 'html-loader'
          }
        ]
      }
    ]
  },
  'plugins': [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}