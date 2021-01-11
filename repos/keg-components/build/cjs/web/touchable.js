'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
var reactNative = require('react-native');
var useClassName = require('./useClassName-6b6da47b.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

var Touchable = React__default.forwardRef(function (props, ref) {
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
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "showFeedback", "touchRef", "onPress", "onPressIn", "onPressOut", "activeOpacity", "style"]);
  var classRef = useClassName.useClassName('keg-touchable', className, touchRef || ref);
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
  return React__default.createElement(reactNative.Pressable, _rollupPluginBabelHelpers._extends({
    accessible: true
  }, attrs, {
    style: touchStyles,
    onPress: onPress,
    onPressIn: onTouchIn,
    onPressOut: onTouchOut,
    ref: classRef
  }));
});

var Touchable$1 = styleInjector.StyleInjector(Touchable, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  important: ['transitionDuration', 'WebkitTransitionDuration']
});
Touchable$1.propTypes = Touchable.propTypes;

exports.Touchable = Touchable$1;
//# sourceMappingURL=touchable.js.map
