'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var useClassName_native = require('./useClassName.native-3d1a229b.js');
var reactNative = require('react-native');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Image = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName_native.useClassName('keg-image', className, ref);
  return React__default['default'].createElement(reactNative.Image, _rollupPluginBabelHelpers._extends({
    accessibilityLabel: "image"
  }, props, {
    ref: classRef
  }));
});

exports.Image = Image;
//# sourceMappingURL=image-53cac4f2.js.map
