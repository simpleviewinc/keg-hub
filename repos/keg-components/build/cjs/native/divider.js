'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var view_native = require('./view.native-b34604af.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var useAccessibilityRole = require('./useAccessibilityRole.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('./useThemeWithHeight.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./getPlatform-24228c6c.js');
require('./useThemePath.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Divider = React__default['default'].forwardRef(function (_ref, ref) {
  _ref.className;
      var style = _ref.style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "style"]);
  var dividerStyle = reTheme.useStyle('divider');
  var accessibilityRoleObj = useAccessibilityRole.useAccessibilityRole('separator');
  return React__default['default'].createElement(view_native.View, _rollupPluginBabelHelpers._extends({
    ref: ref,
    className: useClassList_native.useClassList()
  }, props, {
    style: [dividerStyle, style]
  }, accessibilityRoleObj));
});

exports.Divider = Divider;
//# sourceMappingURL=divider.js.map
