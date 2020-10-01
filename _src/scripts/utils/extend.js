/*!
 * Merge two or more objects together.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object}            Merged values of defaults and options
 */
module.exports = function extend() {
  // Variables
  const extended = {};
  let deep = false;
  let i = 0;

  // Check if a deep merge
  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0];
    i += 1;
  }

  // Merge the object into the extended object
  function merge(obj) {
    Object.keys(obj).forEach(prop => {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        const property = obj[prop];
        if (deep && Object.prototype.toString.call(property) === '[object Object]') {
          extended[prop] = extend(extended[prop], property);
        } else {
          extended[prop] = property;
        }
      }
    });
  }

  // Loop through each object and conduct a merge
  for (; i < arguments.length; i += 1) {
    const obj = arguments[i];
    merge(obj);
  }

  return extended;
};
