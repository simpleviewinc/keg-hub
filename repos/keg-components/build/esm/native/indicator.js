import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { I as IndicatorWrapper } from './indicator.wrapper-83c062e4.js';
import { V as View } from './view.native-b0b1ddd4.js';
import { g as getPlatform } from './getPlatform-e625f46a.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import './useThemePath.js';
import '@keg-hub/re-theme';
import './useThemeWithHeight.js';
import './useClassName.native-32e8827d.js';

var isWeb = getPlatform() === 'web';
var Element = function Element(_ref) {
  _ref.className;
      var _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      size = _ref.size,
      color = _ref.color;
      _objectWithoutProperties(_ref, ["className", "style", "size", "color"]);
  return React.createElement(View, {
    className: useClassList()
  }, React.createElement(ActivityIndicator, {
    size: size,
    color: style.color || color
  }));
};
var Indicator = function Indicator(_ref2) {
  var alt = _ref2.alt,
      size = _ref2.size,
      color = _ref2.color,
      styles = _ref2.styles,
      props = _objectWithoutProperties(_ref2, ["alt", "size", "color", "styles"]);
  return React.createElement(IndicatorWrapper, _extends({}, props, {
    alt: alt || 'Loading',
    size: ['large', 'small'].includes(size) ? size : 'large',
    color: color,
    Element: Element,
    styles: styles,
    isWeb: isWeb
  }));
};

export { Indicator };
//# sourceMappingURL=indicator.js.map
