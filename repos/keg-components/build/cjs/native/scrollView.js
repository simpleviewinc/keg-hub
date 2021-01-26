'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var useScrollClassName_native = require('./useScrollClassName.native-c0cd7ecb.js');

var ScrollView = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassName_native.useScrollClassName('keg-scrollview', className, innerClassName, ref);
  return React__default.createElement(reactNative.ScrollView, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }));
});

exports.ScrollView = ScrollView;
//# sourceMappingURL=scrollView.js.map
