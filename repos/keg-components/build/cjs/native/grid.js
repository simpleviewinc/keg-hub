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
var row = require('./row.js');

var buildCenterStyles = function buildCenterStyles(isCenter) {
  return isCenter === 'x' || isCenter === 'xaxis' || isCenter === 'x-axis' ? {
    justifyContent: 'center'
  } : isCenter === 'y' || isCenter === 'yaxis' || isCenter === 'y-axis' ? {
    alignItems: 'center'
  } : isCenter && {
    alignItems: 'center',
    justifyContent: 'center'
  } || {};
};
var getChildAttrs = function getChildAttrs(children) {
  children = jsutils.isArr(children) && children || [children];
  return children.reduce(function (attrs, child) {
    if (attrs.isRow && attrs.isCenter) return attrs;
    if (!attrs.isRow && child && child.type === row.Row) attrs.isRow = true;
    if (!attrs.isCenter && child && child.props && child.props.center) attrs.isCenter = child.props.center.toString().toLowerCase();
    return attrs;
  }, {
    isRow: false,
    isCenter: false
  });
};
var Grid = function Grid(_ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className", "children", "style"]);
  var theme = reTheme.useTheme();
  var _getChildAttrs = getChildAttrs(children),
      isRow = _getChildAttrs.isRow,
      isCenter = _getChildAttrs.isCenter;
  return React__default.createElement(container.Container, _rollupPluginBabelHelpers._extends({}, props, {
    className: useClassList_native.useClassList(),
    flexDir: isRow ? 'column' : 'row',
    size: 1,
    style: [jsutils.get(theme, ['layout', 'grid', 'wrapper']), style, isCenter && buildCenterStyles(isCenter)]
  }), children);
};

exports.Grid = Grid;
//# sourceMappingURL=grid.js.map
