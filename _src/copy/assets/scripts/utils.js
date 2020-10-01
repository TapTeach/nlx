'use strict';
var utils = function() {
  /**
   * function to update query param
   * @param param, param to update
   * @param newval, value to change
   * @returns {string}
   */
  var updateQueryString = function(param, newval) {
    var search = window.location.search;
    var regex = new RegExp('([?;&])' + param + '[^&;]*[;&]?');
    var query = search.replace(regex, '$1').replace(/&$/, '');

    return (
      (query.length > 2 ? query + '&' : '?') +
      (newval ? param + '=' + newval : '')
    );
  };

  /**
   * Scroll down the page to the designated selector
   * @param {String} CSS selector for designated element
   */
  var scrollToSelector = function(selector, offset) {
    offset = typeof offset !== 'undefined' ? offset : 80;
    var target = $(selector);

    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - offset
        },600
      );
      return false;
    }
  };

  /**
   * hasHash will check if theres a hash on the url
   * @returns {boolean}
   */
  var hasHash = function() {
    var hash = document.location.hash;

    if (hash) {
      return true;
    }

    return false;
  };

  /**
   * arrayIncludes determines whether an array includes a certain element
   * @param arr is the array to be searched
   * @param val is the value being searched for
   */
  var arrayIncludes = function(arr, val) {
    return arr.some(function(arrVal) {
      return val === arrVal;
    });
  };

  return {
    updateQueryString: updateQueryString,
    scrollToSelector: scrollToSelector,
    hasHash: hasHash,
    arrayIncludes: arrayIncludes
  };
};

window.nbApp.utils = utils();
