import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import { u as useClassName } from './useClassName-682bc33b.js';
import { withTouch } from './withTouch.js';

var Input = forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-input', className, ref);
  var TextInputTouch = withTouch(TextInput, {
    showFeedback: false
  });
  return React.createElement(TextInputTouch, _extends({
    accessibilityRole: "textbox"
  }, props, {
    ref: classRef
  }));
});

export { Input as I };
//# sourceMappingURL=input-1ff0e077.js.map
