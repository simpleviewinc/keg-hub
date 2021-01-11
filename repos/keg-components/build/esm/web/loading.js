import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { g as getPlatform } from './getPlatform-95568099.js';
import React__default from 'react';
import { isValidComponent } from './isValidComponent.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import { ActivityIndicator } from 'react-native';
import './useClassName-a3859346.js';
import './view.native-117494a9.js';
import '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-216fa8c1.js';
import './useTextAccessibility.js';
import './kegText.native-231e3dc9.js';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-fd522d17.js';
import { Text } from './text.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList-eea8a571.js';
import { I as IndicatorWrapper } from './indicator.wrapper-e9bc17e3.js';

var isWeb = getPlatform() === 'web';
var Element = function Element(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      size = _ref.size,
      color = _ref.color,
      attrs = _objectWithoutProperties(_ref, ["className", "style", "size", "color"]);
  return React__default.createElement(View, {
    className: useClassList('keg-indicator', className)
  }, React__default.createElement(ActivityIndicator, {
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
  return React__default.createElement(IndicatorWrapper, _extends({}, props, {
    alt: alt || 'Loading',
    size: ['large', 'small'].includes(size) ? size : 'large',
    color: color,
    Element: Element,
    styles: styles,
    isWeb: isWeb
  }));
};

var Progress = function Progress(props) {
  var styles = props.styles,
      text = props.text,
      loadIndicator = props.loadIndicator,
      type = props.type,
      size = props.size;
  var LoadingIndicator = loadIndicator || Indicator;
  return React__default.createElement(View, {
    style: styles.progress,
    className: "keg-progress"
  }, isValidComponent(LoadingIndicator) ? React__default.createElement(LoadingIndicator, {
    size: size,
    styles: styles.indicator,
    type: type
  }) : text && React__default.createElement(Text, {
    className: "keg-progress-text",
    style: styles.text
  }, text));
};
var Loading = function Loading(props) {
  var className = props.className,
      children = props.children,
      _props$text = props.text,
      text = _props$text === void 0 ? 'Loading' : _props$text,
      indicator = props.indicator,
      size = props.size,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type;
  var builtStyles = useThemePath(themePath || "loading.".concat(type), styles);
  return React__default.createElement(View, {
    style: builtStyles.main,
    className: useClassList('keg-loading', className)
  }, children || React__default.createElement(Progress, {
    styles: builtStyles,
    text: text,
    loadIndicator: indicator,
    type: type,
    size: size
  }));
};

export { Loading };
//# sourceMappingURL=loading.js.map
