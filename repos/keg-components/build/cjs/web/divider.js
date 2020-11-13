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
require('./useClassName-afee43f7.js');
require('./view.native-b2081485.js');
require('@keg-hub/re-theme/styleInjector');
var view = require('./view-bc6e3186.js');
var reTheme = require('@keg-hub/re-theme');
var useClassList = require('./useClassList-2f47489f.js');

var Divider = function Divider(_ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "style"]);
  var theme = reTheme.useTheme();
  return React__default.createElement(view.View, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "separator",
    className: useClassList.useClassList('keg-divider', className)
  }, props, {
    style: [jsutils.get(theme, ['divider']), style]
  }));
};

exports.Divider = Divider;
//# sourceMappingURL=divider.js.map
