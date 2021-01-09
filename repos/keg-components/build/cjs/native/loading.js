'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var getPlatform = require('./getPlatform-24228c6c.js');
var React = require('react');
var React__default = _interopDefault(React);
var isValidComponent = require('./isValidComponent.js');
var reactNative = require('react-native');
require('./useClassName.native-3d1a229b.js');
var view_native = require('./view.native-20f555a1.js');
require('./useTextAccessibility.js');
require('./kegText.js');
require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-3f09043e.js');
var text = require('./text.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var indicator_wrapper = require('./indicator.wrapper-628cb0c5.js');

var isWeb = getPlatform.getPlatform() === 'web';
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

var Progress = function Progress(props) {
  var styles = props.styles,
      text$1 = props.text,
      loadIndicator = props.loadIndicator,
      type = props.type,
      size = props.size;
  var LoadingIndicator = loadIndicator || Indicator;
  return React__default.createElement(view_native.View, {
    style: styles.progress,
    className: "keg-progress"
  }, isValidComponent.isValidComponent(LoadingIndicator) ? React__default.createElement(LoadingIndicator, {
    size: size,
    styles: styles.indicator,
    type: type
  }) : text$1 && React__default.createElement(text.Text, {
    className: "keg-progress-text",
    style: styles.text
  }, text$1));
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
  var builtStyles = useThemePath.useThemePath(themePath || "loading.".concat(type), styles);
  return React__default.createElement(view_native.View, {
    style: builtStyles.main,
    className: useClassList_native.useClassList()
  }, children || React__default.createElement(Progress, {
    styles: builtStyles,
    text: text,
    loadIndicator: indicator,
    type: type,
    size: size
  }));
};

exports.Loading = Loading;
//# sourceMappingURL=loading.js.map
