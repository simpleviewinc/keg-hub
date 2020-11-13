import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import React__default from 'react';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-477fb4c5.js';
import './view.native-3802ec98.js';
import '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-45334891.js';
import { withTheme } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList-4be992cd.js';

var Section = withTheme(function (props) {
  var className = props.className,
      theme = props.theme,
      children = props.children,
      style = props.style,
      type = props.type,
      args = _objectWithoutProperties(props, ["className", "theme", "children", "style", "type"]);
  return React__default.createElement(View, _extends({}, args, {
    className: useClassList('keg-section', className),
    accessibilityRole: "region",
    style: theme.get("section.default", type && "section.".concat(type), style)
  }), children);
});

export { Section };
//# sourceMappingURL=section.js.map
