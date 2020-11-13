import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import React__default from 'react';
import { u as useClassName } from './useClassName-477fb4c5.js';

var Input = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-input', className, ref);
  return React__default.createElement("input", _extends({
    ref: classRef
  }, props));
});

export { Input as I };
//# sourceMappingURL=input.web-00da1b52.js.map
