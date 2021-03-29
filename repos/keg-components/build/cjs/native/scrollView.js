'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var useScrollClassName_native = require('./useScrollClassName.native-c0cd7ecb.js');
var reactNative = require('react-native');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ScrollView = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassName_native.useScrollClassName('keg-scrollview', className, innerClassName, ref);
  return React__default['default'].createElement(reactNative.ScrollView, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }));
});

exports.ScrollView = ScrollView;
//# sourceMappingURL=scrollView.js.map
