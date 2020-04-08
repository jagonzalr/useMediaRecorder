'use strict'

const path = require('path')
const webpack = require('webpack')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, './demo')

let config = {
  devtool: 'cheap-module-eval-source-map',
  target: 'web',
  mode: 'development',
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false
  },
  entry: {
    build: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './demo/index'
    ]
  },
  output: {
    pathinfo: true,
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: { colors: true, progress: true },
    contentBase: path.join(__dirname, '../demo'),
    quiet: false,
    hot: true
    /* watchOptions: {
      aggregateTimeout: 300,
      poll: true
    } */
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
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      inject: true
    }),
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin()
  ]
}

module.exports = config
