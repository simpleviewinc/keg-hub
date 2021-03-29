import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { u as useClassName } from './useClassName-682bc33b.js';

var Input = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-input', className, ref);
  return React.createElement("input", _extends({
    ref: classRef
  }, props));
});

export { Input as I };
//# sourceMappingURL=input.web-14b4a9e4.js.map
