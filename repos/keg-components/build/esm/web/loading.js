import React__default from 'react';
import { V as View } from './view-9c41ec1e.js';
import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import { ActivityIndicator } from 'react-native-web';
import { I as IndicatorWrapper } from './indicator.wrapper-2c72453d.js';
import { g as getPlatform } from './getPlatform-95568099.js';
import { u as useClassList } from './useClassList-1d418045.js';
import { Text } from './text.js';
import '@keg-hub/jsutils';
import { isValidComponent } from './isValidComponent.js';
import '@keg-hub/re-theme/colors';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import './view.native-2491eb60.js';
import './useClassName-ed83df40.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './kegText-9f80996b.js';
import './kegText.native-6bbad9e4.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import '@keg-hub/re-theme';

var _excluded = ["className", "style", "size", "color"],
    _excluded2 = ["alt", "size", "color", "styles"];
var isWeb = getPlatform() === 'web';
var Element = function Element(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      size = _ref.size,
      color = _ref.color;
      _objectWithoutProperties(_ref, _excluded);
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
      props = _objectWithoutProperties(_ref2, _excluded2);
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
    className: 'keg-loading-indicator',
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
