import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { I as IndicatorWrapper } from './indicator.wrapper-ddd47db5.js';
import { V as View } from './view-2274aefb.js';
import { g as getPlatform } from './getPlatform-95568099.js';
import { u as useClassList } from './useClassList-1d418045.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import './useThemePath.js';
import '@keg-hub/re-theme';
import './useThemeWithHeight.js';
import './view.native-a7f08b5b.js';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';

var isWeb = getPlatform() === 'web';
var Element = function Element(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      size = _ref.size,
      color = _ref.color;
      _objectWithoutProperties(_ref, ["className", "style", "size", "color"]);
  return React.createElement(View, {
    className: useClassList('keg-indicator', className)
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
