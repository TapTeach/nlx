/*
 * @title Styles
 * @description A task to compile Sass to CSS
 */

// Dependencies
import { src, dest } from 'gulp';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import handleErrors from '../utils/handleErrors.js';
import browserSync from 'browser-sync';

// Config
import { config, isProd } from '../config';

const devProcessors = [autoprefixer()];
const prodProcessors = [autoprefixer(), cssnano(config.styles.cssnano)];

// Task
const styles = () => {
  return src(config.styles.src)
    .on('error', handleErrors)
    .pipe(gulpif(isProd, sourcemaps.init()))
    .pipe(sass(config.styles.sass))
    .pipe(gulpif(!isProd, postcss(devProcessors)))
    .pipe(gulpif(isProd, postcss(prodProcessors)))
    .pipe(gulpif(isProd, sourcemaps.write('.')))
    .pipe(dest(config.styles.dest))
    .pipe(browserSync.stream());
};

export default styles;
