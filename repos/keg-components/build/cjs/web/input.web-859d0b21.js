'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);
var useClassName = require('./useClassName-6b6da47b.js');

var Input = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName.useClassName('keg-input', className, ref);
  return React__default.createElement("input", _rollupPluginBabelHelpers._extends({
    ref: classRef
  }, props));
});

exports.Input = Input;
//# sourceMappingURL=input.web-859d0b21.js.map
