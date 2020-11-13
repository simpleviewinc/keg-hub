'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('./defaults-75e5d8bf.js');
require('./buildColorStyles-ca288c4b.js');
require('@keg-hub/re-theme/colors');
var platformFlatten = require('./platformFlatten-3e8e9019.js');
require('./buildTheme.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
require('./useClassName.native-3d1a229b.js');
var view_native = require('./view.native-20f555a1.js');
require('@keg-hub/re-theme');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var indicator_wrapper = require('./indicator.wrapper-cf3077d7.js');

var isWeb = platformFlatten.getPlatform() === 'web';
var Element = function Element(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      size = _ref.size,
      color = _ref.color,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "style", "size", "color"]);
  return React__default.createElement(view_native.View, {
    className: useClassList_native.useClassList()
  }, React__default.createElement(reactNative.ActivityIndicator, {
    size: size,
    color: style.color || color
  }));
};
var Indicator = function Indicator(_ref2) {
  var alt = _ref2.alt,
      size = _ref2.size,
      color = _ref2.color,
      styles = _ref2.styles,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref2, ["alt", "size", "color", "styles"]);
  return React__default.createElement(indicator_wrapper.IndicatorWrapper, _rollupPluginBabelHelpers._extends({}, props, {
    alt: alt || 'Loading',
    size: ['large', 'small'].includes(size) ? size : 'large',
    color: color,
    Element: Element,
    styles: styles,
    isWeb: isWeb
  }));
};

exports.Indicator = Indicator;
//# sourceMappingURL=indicator.js.map
