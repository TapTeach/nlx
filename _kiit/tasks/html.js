/*
 * @title html
 * @description Task to compile markup via Twig.js
 */

// Dependencies
import { src, dest } from 'gulp';
import fs from 'fs';
import twig from 'gulp-twig';
import data from 'gulp-data';
import twigMarkdown from 'twig-markdown';
import browserSync from 'browser-sync';
import handleErrors from '../utils/handleErrors';
import projectPath from '../utils/projectPath';

// Config
import { config, paths } from '../config';

// dotenv
const dotenv = require('dotenv').config();

// Data Object
const getData = () => {
  const jsonData = {
    global: JSON.parse(fs.readFileSync(projectPath(paths.src, 'html/_data/global.json')), 'utf8'),
    options: JSON.parse(fs.readFileSync(projectPath(paths.src, 'html/_data/options.json')), 'utf8'),
    search: JSON.parse(fs.readFileSync(projectPath(paths.src, 'html/_data/search.json')), 'utf8'),
    package: JSON.parse(fs.readFileSync(projectPath('package.json'), 'utf8')),
    dotenv: dotenv.parsed
  };

  return jsonData;
};

// Task
const html = () => {
  return src([config.html.src, config.html.excludeFolders])
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(
      twig({
        base: `${paths.src}/html/`,
        data: data(getData),
        extend: twigMarkdown
      })
    )
    .pipe(dest(config.html.dest))
    .on('error', handleErrors)
    .pipe(browserSync.stream());
};

export default html;
