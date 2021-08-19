import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { useTheme } from '@keg-hub/re-theme';
import { get } from '@keg-hub/jsutils';
import { Container } from './container.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import './view.native-f7a27d15.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './getPressHandler.js';
import './getPlatform-e625f46a.js';
import '@keg-hub/re-theme/colors';

var _excluded = ["className", "children", "style"];
var Row = function Row(_ref) {
  _ref.className;
      var children = _ref.children,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, _excluded);
  var theme = useTheme();
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList(),
    style: [get(theme, 'layout.grid.row'), style],
    flexDir: "row"
  }), children);
};

export { Row };
//# sourceMappingURL=row.js.map
