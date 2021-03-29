'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var useClassName = require('./useClassName-51ea3221.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Input = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName.useClassName('keg-input', className, ref);
  return React__default['default'].createElement("input", _rollupPluginBabelHelpers._extends({
    ref: classRef
  }, props));
});

exports.Input = Input;
//# sourceMappingURL=input.web-adf7ad46.js.map
