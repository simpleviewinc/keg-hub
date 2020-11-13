import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, isArr } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './buildColorStyles-a1255086.js';
import '@keg-hub/re-theme/colors';
import './platformFlatten-50b3991b.js';
import './buildTheme.js';
import React__default from 'react';
import './getPressHandler.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './view.native-54e7e7ef.js';
import { useTheme } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList.native-70068878.js';
import { Container } from './container.js';
import { Row } from './row.js';

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
  children = isArr(children) && children || [children];
  return children.reduce(function (attrs, child) {
    if (attrs.isRow && attrs.isCenter) return attrs;
    if (!attrs.isRow && child && child.type === Row) attrs.isRow = true;
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
      props = _objectWithoutProperties(_ref, ["className", "children", "style"]);
  var theme = useTheme();
  var _getChildAttrs = getChildAttrs(children),
      isRow = _getChildAttrs.isRow,
      isCenter = _getChildAttrs.isCenter;
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList(),
    flexDir: isRow ? 'column' : 'row',
    size: 1,
    style: [get(theme, ['layout', 'grid', 'wrapper']), style, isCenter && buildCenterStyles(isCenter)]
  }), children);
};

export { Grid };
//# sourceMappingURL=grid.js.map
