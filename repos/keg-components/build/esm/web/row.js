import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { useTheme } from '@keg-hub/re-theme';
import { get } from '@keg-hub/jsutils';
import { Container } from './container.js';
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
var Row = function Row(_ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, _excluded);
  var theme = useTheme();
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList('keg-row', className),
    style: [get(theme, 'layout.grid.row'), style],
    flexDir: "row"
  }), children);
};

export { Row };
//# sourceMappingURL=row.js.map
