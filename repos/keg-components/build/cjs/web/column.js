'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('./getPlatform-ec53cd5e.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./getPressHandler.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-6b6da47b.js');
require('./view.native-e2bb0f89.js');
require('@keg-hub/re-theme/styleInjector');
require('./view-ea13da55.js');
var reTheme = require('@keg-hub/re-theme');
var useClassList = require('./useClassList-9eaefcd6.js');
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
    className: useClassList.useClassList('keg-column', className),
    size: size,
    flexDir: "column",
    style: [jsutils.get(theme, ['layout', 'grid', 'column']), props.style, getColumnWidth(size, theme)]
  }), children);
};

exports.Column = Column;
//# sourceMappingURL=column.js.map
