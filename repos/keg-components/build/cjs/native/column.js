'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('./defaults-75e5d8bf.js');
require('./buildColorStyles-ca288c4b.js');
require('@keg-hub/re-theme/colors');
require('./platformFlatten-3e8e9019.js');
require('./buildTheme.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./getPressHandler.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./view.native-20f555a1.js');
var reTheme = require('@keg-hub/re-theme');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var container = require('./container.js');

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
      size = _ref.size,
      center = _ref.center,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "children", "size", "center"]);
  var theme = reTheme.useTheme();
  return React__default.createElement(container.Container, _rollupPluginBabelHelpers._extends({}, props, {
    className: useClassList_native.useClassList(),
    size: size,
    flexDir: "column",
    style: [jsutils.get(theme, ['layout', 'grid', 'column']), props.style, getColumnWidth(size, theme)]
  }), children);
};

exports.Column = Column;
//# sourceMappingURL=column.js.map
