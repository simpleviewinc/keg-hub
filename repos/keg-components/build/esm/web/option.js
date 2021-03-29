import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';

var Option = function Option(props) {
  var children = props.children,
      label = props.label;
      props.style;
      var text = props.text,
      value = props.value,
      args = _objectWithoutProperties(props, ["children", "label", "style", "text", "value"]);
  return React.createElement("option", _extends({}, args, {
    value: value || label || text
  }), label || value || text || children);
};

export { Option };
//# sourceMappingURL=option.js.map
