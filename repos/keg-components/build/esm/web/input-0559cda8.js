import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import React__default, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import { u as useClassName } from './useClassName-a3859346.js';
import { withTouch } from './withTouch.js';

var Input = forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-input', className, ref);
  var TextInputTouch = withTouch(TextInput, {
    showFeedback: false
  });
  return React__default.createElement(TextInputTouch, _extends({
    accessibilityRole: "textbox"
  }, props, {
    ref: classRef
  }));
});

export { Input as I };
//# sourceMappingURL=input-0559cda8.js.map
