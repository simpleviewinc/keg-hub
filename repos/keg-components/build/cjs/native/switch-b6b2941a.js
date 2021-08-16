'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var useClassName_native = require('./useClassName.native-3d1a229b.js');
var reactNative = require('react-native');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className"];
var Switch = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName_native.useClassName('keg-switch', className, ref);
  return React__default['default'].createElement(reactNative.Switch, _rollupPluginBabelHelpers._extends({}, props, {
    reg: classRef
  }));
});

exports.Switch = Switch;
//# sourceMappingURL=switch-b6b2941a.js.map
