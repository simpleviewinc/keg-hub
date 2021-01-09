import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import './getPlatform-95568099.js';
import React__default from 'react';
import './getPressHandler.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-a3859346.js';
import './view.native-117494a9.js';
import '@keg-hub/re-theme/styleInjector';
import './view-216fa8c1.js';
import { useTheme } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList-eea8a571.js';
import { Container } from './container.js';

var widthFromSize = function widthFromSize(size, theme) {
  var total = get(theme, ['layout', 'columns'], 12);
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
      props = _objectWithoutProperties(_ref, ["className", "children", "size", "center"]);
  var theme = useTheme();
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList('keg-column', className),
    size: size,
    flexDir: "column",
    style: [get(theme, ['layout', 'grid', 'column']), props.style, getColumnWidth(size, theme)]
  }), children);
};

export { Column };
//# sourceMappingURL=column.js.map
