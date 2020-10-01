/*
 * @title Webpack Config
 */

// Dependencies
import webpack from 'webpack';

// Config
import { config } from './_kiit/config';

// Webpack Plugins
const WebpackNotifierPlugin = require('webpack-notifier');

// Configuration Export
const webpackConfig = {
  mode: process.env.NODE_ENV,

  entry: {
    app: `${config.scripts.src}/app.js`,
    docs: `${config.scripts.src}/docs.js`,
    polyfill: `${config.scripts.src}/polyfill.js`
  },

  output: {
    filename: '[name].js'
  },

  externals: {
    $: 'jquery',
    jquery: 'jQuery'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackNotifierPlugin({
      skipFirstNotification: true
    })
  ]
};

// dev-mode specific config
if (process.env.NODE_ENV === 'development') {
  // console.log('Mode: Development');
}

// production-mode specific config
if (process.env.NODE_ENV === 'production') {
  // console.log('Mode: Production');
  webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig;
