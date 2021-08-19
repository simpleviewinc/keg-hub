'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reactNativeWeb = require('react-native-web');
var indicator_wrapper = require('./indicator.wrapper-b537ce8c.js');
var view = require('./view-3fcb25db.js');
var getPlatform = require('./getPlatform-ec53cd5e.js');
var useClassList = require('./useClassList-89a8dbd4.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('./useThemePath.js');
require('@keg-hub/re-theme');
require('./useThemeWithHeight.js');
require('./view.native-895f9104.js');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "style", "size", "color"],
    _excluded2 = ["alt", "size", "color", "styles"];
var isWeb = getPlatform.getPlatform() === 'web';
var Element = function Element(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      size = _ref.size,
      color = _ref.color;
      _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  return React__default['default'].createElement(view.View, {
    className: useClassList.useClassList('keg-indicator', className)
  }, React__default['default'].createElement(reactNativeWeb.ActivityIndicator, {
    size: size,
    color: style.color || color
  }));
};
var Indicator = function Indicator(_ref2) {
  var alt = _ref2.alt,
      size = _ref2.size,
      color = _ref2.color,
      styles = _ref2.styles,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref2, _excluded2);
  return React__default['default'].createElement(indicator_wrapper.IndicatorWrapper, _rollupPluginBabelHelpers._extends({}, props, {
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
