import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import { u as useClassName } from './useClassName.native-32e8827d.js';

var Input = forwardRef(function (_ref, ref) {
  var className = _ref.className,
      onPress = _ref.onPress,
      onFocus = _ref.onFocus,
      props = _objectWithoutProperties(_ref, ["className", "onPress", "onFocus"]);
  var classRef = useClassName('keg-input', className, ref);
  return React.createElement(TextInput, _extends({
    onFocus: onFocus || onPress,
    accessibilityRole: "textbox"
  }, props, {
    ref: classRef
  }));
});

export { Input as I };
//# sourceMappingURL=input-b54ba952.js.map
