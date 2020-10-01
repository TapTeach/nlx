/**
 * getSiblings
 * @param  {String}   selector DOM element to find sibling elements
 * @return {Object}
 */
module.exports = elem => {
  let sibling = elem.parentNode.firstChild;
  const siblings = [];

  for (; sibling; sibling = sibling.nextSibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
  }

  return siblings;
};
