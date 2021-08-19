'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var reactNativeWeb = require('react-native-web');

var createElement = function createElement(Element, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  var childs = props.children || children;
  return reactNativeWeb.unstable_createElement.apply(void 0, [Element, props].concat(_rollupPluginBabelHelpers._toConsumableArray(childs)));
};

exports.createElement = createElement;
//# sourceMappingURL=createElement.js.map
