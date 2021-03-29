'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
var container = require('./container.js');
var useClassList = require('./useClassList-89a8dbd4.js');
require('./view-276572bd.js');
require('./view.native-99366b4b.js');
require('react-native');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./getPlatform-ec53cd5e.js');
require('./getPressHandler.js');
require('@keg-hub/re-theme/colors');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var widthFromSize = function widthFromSize(size, theme) {
  var total = jsutils.get(theme, ['layout', 'columns'], 12);
  size = size > total ? total : size;
  var colWidth = parseFloat(size * (100 / total)).toFixed(4);
  return {
    minWidth: "".concat(colWidth, "%"),
    maxWidth: "".concat(colWidth, "%")
  };
};
var getColumnWidth = function getColumnWidth(size, theme) {
  return size ? widthFromSize(size, theme) : {
    flexGrow: 1
  };
};
var Column = function Column(_ref) {
  var className = _ref.className,
      children = _ref.children,
      size = _ref.size;
      _ref.center;
      var props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "children", "size", "center"]);
  var theme = reTheme.useTheme();
  return React__default['default'].createElement(container.Container, _rollupPluginBabelHelpers._extends({}, props, {
    className: useClassList.useClassList('keg-column', className),
    size: size,
    flexDir: "column",
    style: [jsutils.get(theme, ['layout', 'grid', 'column']), props.style, getColumnWidth(size, theme)]
  }), children);
};

exports.Column = Column;
//# sourceMappingURL=column.js.map
