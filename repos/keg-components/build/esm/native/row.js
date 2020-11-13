import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
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

var Row = function Row(_ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "children", "style"]);
  var theme = useTheme();
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList(),
    style: [get(theme, 'layout.grid.row'), style],
    flexDir: "row"
  }), children);
};

export { Row };
//# sourceMappingURL=row.js.map
