'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
var view_native = require('./view.native-b34604af.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Divider = React__default['default'].forwardRef(function (_ref, ref) {
  _ref.className;
      var style = _ref.style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "style"]);
  var theme = reTheme.useTheme();
  return React__default['default'].createElement(view_native.View, _rollupPluginBabelHelpers._extends({
    ref: ref,
    accessibilityRole: "separator",
    className: useClassList_native.useClassList()
  }, props, {
    style: [jsutils.get(theme, ['divider']), style]
  }));
});

exports.Divider = Divider;
//# sourceMappingURL=divider.js.map
