import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { Container } from './container.js';
import { Row } from './row.js';
import { useTheme } from '@keg-hub/re-theme';
import { get, isArr } from '@keg-hub/jsutils';
import { u as useClassList } from './useClassList-1d418045.js';
import './view-9c41ec1e.js';
import './view.native-2491eb60.js';
import 'react-native-web';
import './useClassName-ed83df40.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './getPlatform-95568099.js';
import './getPressHandler.js';
import '@keg-hub/re-theme/colors';

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
      props = _objectWithoutProperties(_ref, _excluded);
  var theme = useTheme();
  var _getChildAttrs = getChildAttrs(children),
      isRow = _getChildAttrs.isRow,
      isCenter = _getChildAttrs.isCenter;
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList('keg-grid', className),
    flexDir: isRow ? 'column' : 'row',
    size: 1,
    style: [get(theme, ['layout', 'grid', 'wrapper']), style, isCenter && buildCenterStyles(isCenter)]
  }), children);
};

export { Grid };
//# sourceMappingURL=grid.js.map
