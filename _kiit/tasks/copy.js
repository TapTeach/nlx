/*
 * @title Copy
 * @description Task to copy static assets to the build directory.
 */

// Dependencies
import { src, dest } from 'gulp';
import changed from 'gulp-changed';

// Config
import { config } from '../config';

// Task
const copy = () => {
  return src(config.copy.src)
    .pipe(changed(config.copy.dest))
    .pipe(dest(config.copy.dest));
};

export default copy;
