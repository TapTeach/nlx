/**
 * waitFor
 * @param  {String}   selector DOM element to check for on every page load
 * @param  {Function} callback The code to execute when the element is on the page
 * @return {Boolean}
 */
module.exports = (selector, callback) => {
  if (document.querySelectorAll(selector).length > 0) {
    callback();
  }
};
