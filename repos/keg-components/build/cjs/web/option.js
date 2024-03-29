'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["children", "label", "style", "text", "value"];
var Option = function Option(props) {
  var children = props.children,
      label = props.label;
      props.style;
      var text = props.text,
      value = props.value,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  return React__default['default'].createElement("option", _rollupPluginBabelHelpers._extends({}, args, {
    value: value || label || text
  }), label || value || text || children);
};

exports.Option = Option;
//# sourceMappingURL=option.js.map
