'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var container = require('./container.js');
var row = require('./row.js');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
var useClassList = require('./useClassList-89a8dbd4.js');
require('./view-3fcb25db.js');
require('./view.native-895f9104.js');
require('react-native-web');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./getPlatform-ec53cd5e.js');
require('./getPressHandler.js');
require('@keg-hub/re-theme/colors');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "children", "style"];
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
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var theme = reTheme.useTheme();
  var _getChildAttrs = getChildAttrs(children),
      isRow = _getChildAttrs.isRow,
      isCenter = _getChildAttrs.isCenter;
  return React__default['default'].createElement(container.Container, _rollupPluginBabelHelpers._extends({}, props, {
    className: useClassList.useClassList('keg-grid', className),
    flexDir: isRow ? 'column' : 'row',
    size: 1,
    style: [jsutils.get(theme, ['layout', 'grid', 'wrapper']), style, isCenter && buildCenterStyles(isCenter)]
  }), children);
};

exports.Grid = Grid;
//# sourceMappingURL=grid.js.map
