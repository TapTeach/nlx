/*
 * @title Clean
 * @description Task to clean up build directory by removing everything.
 */

// Dependencies
import del from 'del';

// Config
import { paths } from '../config';

// Task
const clean = () => {
  return del([paths.dest]);
};

export default clean;
