'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var reactNative = require('react-native');
var useClassName = require('./useClassName-51ea3221.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var View = React__default['default'].forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["children", "className"]);
  var classRef = useClassName.useClassName('keg-view', className, ref);
  return React__default['default'].createElement(reactNative.View, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }), children);
});

exports.View = View;
//# sourceMappingURL=view.native-99366b4b.js.map
