import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import React__default from 'react';
import 'react-native';
import './useClassName.native-32e8827d.js';
import { V as View } from './view.native-54e7e7ef.js';
import { withTheme } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList.native-70068878.js';

var Section = withTheme(function (props) {
  var className = props.className,
      theme = props.theme,
      children = props.children,
      style = props.style,
      type = props.type,
      args = _objectWithoutProperties(props, ["className", "theme", "children", "style", "type"]);
  return React__default.createElement(View, _extends({}, args, {
    className: useClassList(),
    accessibilityRole: "region",
    style: theme.get("section.default", type && "section.".concat(type), style)
  }), children);
});

export { Section };
//# sourceMappingURL=section.js.map
