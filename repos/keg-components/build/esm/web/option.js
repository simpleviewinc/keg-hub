import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';

var _excluded = ["children", "label", "style", "text", "value"];
var Option = function Option(props) {
  var children = props.children,
      label = props.label;
      props.style;
      var text = props.text,
      value = props.value,
      args = _objectWithoutProperties(props, _excluded);
  return React__default.createElement("option", _extends({}, args, {
    value: value || label || text
  }), label || value || text || children);
};

export { Option };
//# sourceMappingURL=option.js.map
