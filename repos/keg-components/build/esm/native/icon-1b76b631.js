import { d as _objectWithoutProperties, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { useTheme } from '@keg-hub/re-theme';
import { get } from '@keg-hub/jsutils';
import { V as View } from './view.native-b0b1ddd4.js';
import { renderFromType } from './renderFromType.js';
import '@keg-hub/re-theme/colors';
import { isValidComponent } from './isValidComponent.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { u as useClassList } from './useClassList.native-70068878.js';

var Icon = React.forwardRef(function (props, ref) {
  var theme = useTheme();
  props.className;
      var color = props.color,
      Component = props.Component,
      _props$Element = props.Element,
      Element = _props$Element === void 0 ? Component : _props$Element,
      name = props.name,
      size = props.size,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      attrs = _objectWithoutProperties(props, ["className", "color", "Component", "Element", "name", "size", "styles", "themePath", "type"]);
  if (!isValidComponent(Element)) return console.error("Invalid Element passed to Icon component!", Element) || null;
  var iconStyles = useThemePath(themePath || "icon.".concat(type), styles);
  var iconProps = {
    ref: ref,
    name: name,
    style: iconStyles.icon,
    color: color || iconStyles.color || get(iconStyles, 'icon.color') || get(theme, 'typography.default.color'),
    size: parseInt(size || get(iconStyles, 'icon.fontSize') || get(theme, 'typography.default.fontSize', 15) * 2, 10)
  };
  return React.createElement(View, {
    className: useClassList(),
    style: iconStyles.container
  }, renderFromType(Element, _objectSpread2(_objectSpread2({}, attrs), iconProps)));
});

export { Icon as I };
//# sourceMappingURL=icon-1b76b631.js.map
