'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getElementLayout = function getElementLayout(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

exports.getElementLayout = getElementLayout;
//# sourceMappingURL=getElementLayout.js.map
