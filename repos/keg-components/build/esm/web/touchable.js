import { d as _objectWithoutProperties, b as _slicedToArray, _ as _objectSpread2, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { checkCall, noOpObj } from '@keg-hub/jsutils';
import React__default, { useState, useCallback } from 'react';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import { Pressable } from 'react-native';
import { u as useClassName } from './useClassName-a3859346.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';

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
      style = _props$style === void 0 ? noOpObj : _props$style,
      attrs = _objectWithoutProperties(props, ["className", "showFeedback", "touchRef", "onPress", "onPressIn", "onPressOut", "activeOpacity", "style"]);
  var classRef = useClassName('keg-touchable', className, touchRef || ref);
  var _useState = useState(style),
      _useState2 = _slicedToArray(_useState, 2),
      touchStyles = _useState2[0],
      setTouchStyles = _useState2[1];
  var onTouchIn = useCallback(function (event) {
    checkCall(onPressIn, event);
    showFeedback && setTouchStyles(_objectSpread2(_objectSpread2({}, touchStyles), {}, {
      opacity: activeOpacity
    }));
  }, [onPressIn, activeOpacity, showFeedback, touchStyles, setTouchStyles]);
  var onTouchOut = useCallback(function (event) {
    checkCall(onPressOut, event);
    setTouchStyles(style);
  }, [onPressOut, style, setTouchStyles]);
  return React__default.createElement(Pressable, _extends({
    accessible: true
  }, attrs, {
    style: touchStyles,
    onPress: onPress,
    onPressIn: onTouchIn,
    onPressOut: onTouchOut,
    ref: classRef
  }));
});

var Touchable$1 = StyleInjector(Touchable, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  important: ['transitionDuration', 'WebkitTransitionDuration']
});
Touchable$1.propTypes = Touchable.propTypes;

export { Touchable$1 as Touchable };
//# sourceMappingURL=touchable.js.map
