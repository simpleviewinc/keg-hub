'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var jsutils = require('@keg-hub/jsutils');

var scrollList = function scrollList(_ref) {
  var top = _ref.top,
      left = _ref.left,
      _ref$behavior = _ref.behavior,
      behavior = _ref$behavior === void 0 ? 'smooth' : _ref$behavior;
  window.scroll(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
    behavior: behavior
  }, jsutils.exists(top) && {
    top: top
  }), jsutils.exists(left) && {
    left: left
  }));
};

exports.scrollList = scrollList;
//# sourceMappingURL=scrollList.js.map
