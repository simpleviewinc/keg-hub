import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import React__default from 'react';

var Option = function Option(props) {
  var children = props.children,
      label = props.label,
      style = props.style,
      text = props.text,
      value = props.value,
      args = _objectWithoutProperties(props, ["children", "label", "style", "text", "value"]);
  return React__default.createElement("option", _extends({}, args, {
    value: value || label || text
  }), label || value || text || children);
};

export { Option };
//# sourceMappingURL=option.js.map
