'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-a237c005.js');
require('./view.native-ab314649.js');
require('@keg-hub/re-theme/styleInjector');
var view = require('./view-a5f2a568.js');
var reTheme = require('@keg-hub/re-theme');
var useClassList = require('./useClassList-9eaefcd6.js');

var Divider = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "style"]);
  var theme = reTheme.useTheme();
  return React__default.createElement(view.View, _rollupPluginBabelHelpers._extends({
    ref: ref,
    accessibilityRole: "separator",
    className: useClassList.useClassList('keg-divider', className)
  }, props, {
    style: [jsutils.get(theme, ['divider']), style]
  }));
});

exports.Divider = Divider;
//# sourceMappingURL=divider.js.map
