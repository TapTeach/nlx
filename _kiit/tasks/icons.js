/*
 * @title Icons
 * @description Task to build SVG iconography spritesheet
 */

// Dependencies
import { src, dest } from 'gulp';
import svgstore from 'gulp-svgstore';

// Config
import { config } from '../config';

// Task
const icons = () => {
  return src(config.icons.src)
    .pipe(svgstore(config.icons.settings))
    .pipe(dest(config.icons.dest));
};

export default icons;
