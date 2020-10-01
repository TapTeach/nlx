/*
 * @title Images
 * @description Task to copy images.
 */

// Dependencies
import { src, dest } from 'gulp';
import changed from 'gulp-changed';
import handleErrors from '../utils/handleErrors.js';

// Config
import { config } from '../config';

// Task
const images = () => {
  return src(config.images.src)
    .pipe(changed(config.images.src))
    .on('error', handleErrors)
    .pipe(dest(config.images.dest));
};

export default images;
