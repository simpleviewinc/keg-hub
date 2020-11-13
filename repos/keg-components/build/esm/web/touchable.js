import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import React__default from 'react';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import { Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { u as useClassName } from './useClassName-477fb4c5.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';

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

var Touchable$1 = StyleInjector(Touchable, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  important: ['transitionDuration', 'WebkitTransitionDuration']
});
Touchable$1.propTypes = Touchable.propTypes;

export { Touchable$1 as Touchable };
//# sourceMappingURL=touchable.js.map
