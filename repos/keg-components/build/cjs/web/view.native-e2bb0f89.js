'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var useClassName = require('./useClassName-6b6da47b.js');

var View = React__default.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["children", "className"]);
  var classRef = useClassName.useClassName('keg-view', className, ref);
  return React__default.createElement(reactNative.View, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }), children);
});

exports.View = View;
//# sourceMappingURL=view.native-e2bb0f89.js.map
