'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reactNative = require('react-native');
var useClassName_native = require('./useClassName.native-3d1a229b.js');
var jsutils = require('@keg-hub/jsutils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "showFeedback", "touchRef", "onPress", "onPressIn", "onPressOut", "activeOpacity", "style"];
var Touchable = React__default['default'].forwardRef(function (props, ref) {
  var className = props.className,
      _props$showFeedback = props.showFeedback,
      showFeedback = _props$showFeedback === void 0 ? true : _props$showFeedback,
      touchRef = props.touchRef,
      onPress = props.onPress,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      _props$activeOpacity = props.activeOpacity,
      activeOpacity = _props$activeOpacity === void 0 ? 0.4 : _props$activeOpacity,
      _props$style = props.style,
      style = _props$style === void 0 ? jsutils.noOpObj : _props$style,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  var classRef = useClassName_native.useClassName('keg-touchable', className, touchRef || ref);
  var _useState = React.useState(style),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      touchStyles = _useState2[0],
      setTouchStyles = _useState2[1];
  var onTouchIn = React.useCallback(function (event) {
    jsutils.checkCall(onPressIn, event);
    showFeedback && setTouchStyles(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, touchStyles), {}, {
      opacity: activeOpacity
    }));
  }, [onPressIn, activeOpacity, showFeedback, touchStyles, setTouchStyles]);
  var onTouchOut = React.useCallback(function (event) {
    jsutils.checkCall(onPressOut, event);
    setTouchStyles(style);
  }, [onPressOut, style, setTouchStyles]);
  return React__default['default'].createElement(reactNative.Pressable, _rollupPluginBabelHelpers._extends({
    accessible: true
  }, attrs, {
    style: touchStyles,
    onPress: onPress,
    onPressIn: onTouchIn,
    onPressOut: onTouchOut,
    ref: classRef
  }));
});

exports.Touchable = Touchable;
//# sourceMappingURL=touchable.js.map
