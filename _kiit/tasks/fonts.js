/*
 * @title Fonts
 * @description Task to copy fonts.
 */

// Dependencies
import { src, dest } from 'gulp';
import changed from 'gulp-changed';
import handleErrors from '../utils/handleErrors.js';

// Config
import { config } from '../config';

// Task
const fonts = () => {
  return src(config.fonts.src)
    .on('error', handleErrors)
    .pipe(changed(config.fonts.dest))
    .pipe(dest(config.fonts.dest));
};

export default fonts;
