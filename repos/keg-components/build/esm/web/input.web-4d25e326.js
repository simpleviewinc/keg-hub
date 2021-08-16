import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { u as useClassName } from './useClassName-ed83df40.js';

var _excluded = ["className"];
var Input = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName('keg-input', className, ref);
  return React__default.createElement("input", _extends({
    ref: classRef
  }, props));
});

export { Input as I };
//# sourceMappingURL=input.web-4d25e326.js.map
