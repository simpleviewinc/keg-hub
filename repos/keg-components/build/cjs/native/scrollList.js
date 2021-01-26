'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');

var scrollList = function scrollList(_ref) {
  var _listRef$current;
  var listRef = _ref.listRef,
      _ref$animated = _ref.animated,
      animated = _ref$animated === void 0 ? true : _ref$animated,
      top = _ref.top,
      left = _ref.left;
  return listRef === null || listRef === void 0 ? void 0 : (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollTo(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
    animated: animated
  }, jsutils.exists(top) && {
    y: top
  }), jsutils.exists(left) && {
    x: left
  }));
};

exports.scrollList = scrollList;
//# sourceMappingURL=scrollList.js.map
