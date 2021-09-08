'use strict';

var jsutils = require('@keg-hub/jsutils');

const ensureElement = (selectorId, type, location) => {
  let domNode = document[location].querySelector(`#${selectorId}`);
  if (domNode) return domNode;
  domNode = document.createElement(type);
  domNode.id = selectorId;
  document[location].append(domNode);
  return domNode;
};

const scrollList = ({
  element = window,
  top,
  left,
  behavior = 'smooth'
}) => {
  element && element.scroll && element.scroll({
    behavior,
    ...(jsutils.exists(top) && {
      top
    }),
    ...(jsutils.exists(left) && {
      left
    })
  });
};

exports.ensureElement = ensureElement;
exports.scrollList = scrollList;
//# sourceMappingURL=scrollList-9966cc62.js.map
