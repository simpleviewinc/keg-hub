'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var useClassName = require('./useClassName-eec4a5f1.js');
var reactNativeWeb = require('react-native-web');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className"];
var Image = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName.useClassName('keg-image', className, ref);
  return React__default['default'].createElement(reactNativeWeb.Image, _rollupPluginBabelHelpers._extends({
    accessibilityLabel: "image"
  }, props, {
    ref: classRef
  }));
});

exports.Image = Image;
//# sourceMappingURL=image-5ba5f8b8.js.map
