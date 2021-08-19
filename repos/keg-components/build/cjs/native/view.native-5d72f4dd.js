'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reactNative = require('react-native');
var useClassName_native = require('./useClassName.native-3d1a229b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["children", "className"];
var View = React__default['default'].forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName_native.useClassName('keg-view', className, ref);
  return React__default['default'].createElement(reactNative.View, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }), children);
});

exports.View = View;
//# sourceMappingURL=view.native-5d72f4dd.js.map
