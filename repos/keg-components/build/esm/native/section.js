import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { withTheme } from '@keg-hub/re-theme';
import { V as View } from './view.native-f7a27d15.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import '@keg-hub/jsutils';

var _excluded = ["className", "theme", "children", "style", "type"];
var Section = withTheme(function (props) {
  props.className;
      var theme = props.theme,
      children = props.children,
      style = props.style,
      type = props.type,
      args = _objectWithoutProperties(props, _excluded);
  return React__default.createElement(View, _extends({}, args, {
    className: useClassList(),
    accessibilityRole: "region",
    style: theme.get("section.default", type && "section.".concat(type), style)
  }), children);
});

export { Section };
//# sourceMappingURL=section.js.map
