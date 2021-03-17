'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
var view = require('./view-276572bd.js');
var useClassList = require('./useClassList-89a8dbd4.js');
require('./view.native-99366b4b.js');
require('react-native');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Divider = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "style"]);
  var theme = reTheme.useTheme();
  return React__default['default'].createElement(view.View, _rollupPluginBabelHelpers._extends({
    ref: ref,
    accessibilityRole: "separator",
    className: useClassList.useClassList('keg-divider', className)
  }, props, {
    style: [jsutils.get(theme, ['divider']), style]
  }));
});

exports.Divider = Divider;
//# sourceMappingURL=divider.js.map
