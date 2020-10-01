/*
 * @title Server
 * @description Task to start a local server through BrowserSync
 */

// Dependencies
import browserSync from 'browser-sync';

// Config
import { paths } from '../config';

// BrowserSync Initialization
export function serve(cb) {
  browserSync.init({
    port: '8888',
    server: {
      baseDir: paths.dest
    },
    notify: true
  });
  cb();
}

// Trigger BrowserSync Reload
export function reload(cb) {
  browserSync.reload();
  cb();
}
