'use strict'

const path = require('path')
const eslintFormatter = require('react-dev-utils/eslintFormatter')

const srcPath = path.join(__dirname, './src')

module.exports = {
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
  node: {
    fs: 'empty',
    net: 'empty'
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.js', '.mjs', '.json', '.jsx'],
    symlinks: false
  }
}
