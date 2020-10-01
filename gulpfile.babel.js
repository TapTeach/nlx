/*
 * @title gulpfile.babel.js
 * @description Loading all build tasks
 */

// Dependencies
import { series, parallel, watch } from 'gulp';

// Config
import { config } from './_kiit/config';

// Tasks
import { serve, reload } from './_kiit/tasks/server';
import clean from './_kiit/tasks/clean';
import copy from './_kiit/tasks/copy';
import fonts from './_kiit/tasks/fonts';
import styles from './_kiit/tasks/styles';
import scripts from './_kiit/tasks/scripts';
import images from './_kiit/tasks/images';
import icons from './_kiit/tasks/icons';
import html from './_kiit/tasks/html';

// Watch task
const watchFiles = () => {
  watch([config.styles.watch], styles);
  watch([config.scripts.watch], series(scripts, reload));
  watch([config.html.watch], series(html, reload));
  watch([config.images.src], series(images, reload));
  watch([config.icons.src], series(icons, reload));
  watch([config.fonts.src], series(fonts, reload));
};

export const build = series(clean, icons, images, parallel(styles, scripts, fonts, html), copy);

export const dev = series(build, serve, watchFiles);

export const watching = series(serve, watchFiles);

exports.watch = watching;

export default dev;
