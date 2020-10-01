/*
 * @title Scripts
 * @description Task to concatenate & build js files via webpack.
 */

// Dependencies
import { src, dest } from 'gulp';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import handleErrors from '../utils/handleErrors.js';

// Config
import { config } from '../config';

// Get Webpack Config
const webpackConfig = require('../../webpack.config.js');

// Task
const scripts = () => {
  return src(config.scripts.src)
    .on('error', handleErrors)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(dest(config.scripts.dest));
};

export default scripts;
