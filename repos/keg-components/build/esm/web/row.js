import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './colors-3366b3e1.js';
import '@keg-hub/re-theme/colors';
import './buildColorStyles.js';
import './platformFlatten-4856c5dd.js';
import './buildTheme.js';
import React__default from 'react';
import './getPressHandler.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-477fb4c5.js';
import './view.native-3802ec98.js';
import '@keg-hub/re-theme/styleInjector';
import './view-45334891.js';
import { useTheme } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList-4be992cd.js';
import { Container } from './container.js';

var Row = function Row(_ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "children", "style"]);
  var theme = useTheme();
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList('keg-row', className),
    style: [get(theme, 'layout.grid.row'), style],
    flexDir: "row"
  }), children);
};

export { Row };
//# sourceMappingURL=row.js.map
