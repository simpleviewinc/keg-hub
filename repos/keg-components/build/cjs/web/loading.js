'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var view = require('./view-276572bd.js');
var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var reactNative = require('react-native');
var indicator_wrapper = require('./indicator.wrapper-5ad2a9f5.js');
var getPlatform = require('./getPlatform-ec53cd5e.js');
var useClassList = require('./useClassList-89a8dbd4.js');
var text = require('./text.js');
require('@keg-hub/jsutils');
var isValidComponent = require('./isValidComponent.js');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./view.native-99366b4b.js');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./kegText-f2cfdfd4.js');
require('./kegText.native-1994a0b7.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('@keg-hub/re-theme');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var isWeb = getPlatform.getPlatform() === 'web';
var Element = function Element(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      size = _ref.size,
      color = _ref.color;
      _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "style", "size", "color"]);
  return React__default['default'].createElement(view.View, {
    className: useClassList.useClassList('keg-indicator', className)
  }, React__default['default'].createElement(reactNative.ActivityIndicator, {
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
  return React__default['default'].createElement(indicator_wrapper.IndicatorWrapper, _rollupPluginBabelHelpers._extends({}, props, {
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
  return React__default['default'].createElement(view.View, {
    style: styles.progress,
    className: "keg-progress"
  }, isValidComponent.isValidComponent(LoadingIndicator) ? React__default['default'].createElement(LoadingIndicator, {
    className: 'keg-loading-indicator',
    size: size,
    styles: styles.indicator,
    type: type
  }) : text$1 && React__default['default'].createElement(text.Text, {
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
  return React__default['default'].createElement(view.View, {
    style: builtStyles.main,
    className: useClassList.useClassList('keg-loading', className)
  }, children || React__default['default'].createElement(Progress, {
    styles: builtStyles,
    text: text,
    loadIndicator: indicator,
    type: type,
    size: size
  }));
};

exports.Loading = Loading;
//# sourceMappingURL=loading.js.map
