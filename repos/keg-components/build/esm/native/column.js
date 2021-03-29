import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { useTheme } from '@keg-hub/re-theme';
import { get } from '@keg-hub/jsutils';
import { Container } from './container.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import './view.native-b0b1ddd4.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './getPressHandler.js';
import './getPlatform-e625f46a.js';
import '@keg-hub/re-theme/colors';

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
  _ref.className;
      var children = _ref.children,
      size = _ref.size;
      _ref.center;
      var props = _objectWithoutProperties(_ref, ["className", "children", "size", "center"]);
  var theme = useTheme();
  return React.createElement(Container, _extends({}, props, {
    className: useClassList(),
    size: size,
    flexDir: "column",
    style: [get(theme, ['layout', 'grid', 'column']), props.style, getColumnWidth(size, theme)]
  }), children);
};

export { Column };
//# sourceMappingURL=column.js.map
