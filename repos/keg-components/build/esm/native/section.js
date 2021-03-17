import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { withTheme } from '@keg-hub/re-theme';
import { V as View } from './view.native-b0b1ddd4.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import '@keg-hub/jsutils';

var Section = withTheme(function (props) {
  props.className;
      var theme = props.theme,
      children = props.children,
      style = props.style,
      type = props.type,
      args = _objectWithoutProperties(props, ["className", "theme", "children", "style", "type"]);
  return React.createElement(View, _extends({}, args, {
    className: useClassList(),
    accessibilityRole: "region",
    style: theme.get("section.default", type && "section.".concat(type), style)
  }), children);
});

export { Section };
//# sourceMappingURL=section.js.map
