'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
var container = require('./container.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('./view.native-5d72f4dd.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./getPressHandler.js');
require('./getPlatform-24228c6c.js');
require('@keg-hub/re-theme/colors');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "children", "style"];
var Row = function Row(_ref) {
  _ref.className;
      var children = _ref.children,
      style = _ref.style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var theme = reTheme.useTheme();
  return React__default['default'].createElement(container.Container, _rollupPluginBabelHelpers._extends({}, props, {
    className: useClassList_native.useClassList(),
    style: [jsutils.get(theme, 'layout.grid.row'), style],
    flexDir: "row"
  }), children);
};

exports.Row = Row;
//# sourceMappingURL=row.js.map
