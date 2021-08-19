'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var useClassName = require('./useClassName-eec4a5f1.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className"];
var Input = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName.useClassName('keg-input', className, ref);
  return React__default['default'].createElement("input", _rollupPluginBabelHelpers._extends({
    ref: classRef
  }, props));
});

exports.Input = Input;
//# sourceMappingURL=input.web-369be1b2.js.map
