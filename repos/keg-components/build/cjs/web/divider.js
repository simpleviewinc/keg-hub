'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var view = require('./view-3fcb25db.js');
var useClassList = require('./useClassList-89a8dbd4.js');
var useAccessibilityRole = require('./useAccessibilityRole.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('./useThemeWithHeight.js');
require('react-native-web');
require('./view.native-895f9104.js');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./getPlatform-ec53cd5e.js');
require('./useThemePath.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "style"];
var Divider = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var dividerStyle = reTheme.useStyle('divider');
  var accessibilityRoleObj = useAccessibilityRole.useAccessibilityRole('separator');
  return React__default['default'].createElement(view.View, _rollupPluginBabelHelpers._extends({
    ref: ref,
    className: useClassList.useClassList('keg-divider', className)
  }, props, {
    style: [dividerStyle, style]
  }, accessibilityRoleObj));
});

exports.Divider = Divider;
//# sourceMappingURL=divider.js.map
