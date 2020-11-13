import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import React__default from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { u as useClassName } from './useClassName.native-32e8827d.js';

var TouchableComp = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
var Touchable = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      _props$showFeedback = props.showFeedback,
      showFeedback = _props$showFeedback === void 0 ? true : _props$showFeedback,
      touchRef = props.touchRef,
      attrs = _objectWithoutProperties(props, ["className", "showFeedback", "touchRef"]);
  var Component = showFeedback ? TouchableComp : TouchableWithoutFeedback;
  var classRef = useClassName('keg-touchable', className, touchRef || ref);
  return React__default.createElement(Component, _extends({
    accessible: true
  }, attrs, {
    ref: classRef
  }));
});

export { Touchable };
//# sourceMappingURL=touchable.js.map
