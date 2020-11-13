'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);

var Option = function Option(props) {
  var children = props.children,
      label = props.label,
      style = props.style,
      text = props.text,
      value = props.value,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["children", "label", "style", "text", "value"]);
  return React__default.createElement("option", _rollupPluginBabelHelpers._extends({}, args, {
    value: value || label || text
  }), label || value || text || children);
};

exports.Option = Option;
//# sourceMappingURL=option.js.map
