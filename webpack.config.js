'use strict'

const path = require('path')
const eslintFormatter = require('react-dev-utils/eslintFormatter')

const srcPath = path.join(__dirname, './src')

module.exports = {
  devtool: 'source-map',
  target: 'web',
  mode: 'production',
  entry: './src/index.js',
  externals: {
    react: 'react'
  },
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatter
            }
          }
        ],
        include: [srcPath],
        exclude: [/node_modules/]
      },
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve('babel-loader'),
        exclude: /(node_modules)/
      }
    ]
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.js', '.mjs', '.json', '.jsx'],
    symlinks: false,
    fallback: {
      fs: 'empty',
      net: 'empty'
    }
  }
}
