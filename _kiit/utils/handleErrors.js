/*
 * @title Error Handler
 */

import notifier from 'node-notifier';

// Utility Function
const handleErrors = error => {
  notifier.notify({
    title: 'Build Error',
    message: error.message,
    timeout: 2
  });

  console.error('\x1b[31m', error.message, '\x1b[0m');

  this.emit('end');
};

export default handleErrors;
