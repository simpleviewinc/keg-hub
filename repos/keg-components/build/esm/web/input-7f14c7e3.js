import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default, { forwardRef } from 'react';
import { TextInput } from 'react-native-web';
import { u as useClassName } from './useClassName-ed83df40.js';

var _excluded = ["className", "onPress", "onFocus"];
var Input = forwardRef(function (_ref, ref) {
  var className = _ref.className,
      onPress = _ref.onPress,
      onFocus = _ref.onFocus,
      props = _objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName('keg-input', className, ref);
  return React__default.createElement(TextInput, _extends({
    onFocus: onFocus || onPress,
    accessibilityRole: "textbox"
  }, props, {
    ref: classRef
  }));
});

export { Input as I };
//# sourceMappingURL=input-7f14c7e3.js.map
