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

var Row = function Row(_ref) {
  _ref.className;
      var children = _ref.children,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "children", "style"]);
  var theme = useTheme();
  return React.createElement(Container, _extends({}, props, {
    className: useClassList(),
    style: [get(theme, 'layout.grid.row'), style],
    flexDir: "row"
  }), children);
};

export { Row };
//# sourceMappingURL=row.js.map
