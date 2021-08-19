'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reactNativeWeb = require('react-native-web');
var useClassName = require('./useClassName-eec4a5f1.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["children", "className"];
var View = React__default['default'].forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName.useClassName('keg-view', className, ref);
  return React__default['default'].createElement(reactNativeWeb.View, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }), children);
});

exports.View = View;
//# sourceMappingURL=view.native-895f9104.js.map
