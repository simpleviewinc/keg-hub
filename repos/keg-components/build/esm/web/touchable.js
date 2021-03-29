import { d as _objectWithoutProperties, b as _slicedToArray, _ as _objectSpread2, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useState, useCallback } from 'react';
import { Pressable } from 'react-native';
import { u as useClassName } from './useClassName-682bc33b.js';
import { checkCall, noOpObj } from '@keg-hub/jsutils';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';

var Touchable$1 = React.forwardRef(function (props, ref) {
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
  return React.createElement(Pressable, _extends({
    accessible: true
  }, attrs, {
    style: touchStyles,
    onPress: onPress,
    onPressIn: onTouchIn,
    onPressOut: onTouchOut,
    ref: classRef
  }));
});

var Touchable = StyleInjector(Touchable$1, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  important: ['transitionDuration', 'WebkitTransitionDuration']
});
Touchable.propTypes = Touchable$1.propTypes;

export { Touchable };
//# sourceMappingURL=touchable.js.map
