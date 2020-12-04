import { d as _objectWithoutProperties, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import React__default from 'react';
import { isValidComponent } from './isValidComponent.js';
import { renderFromType } from './renderFromType.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import { V as View } from './view.native-54e7e7ef.js';
import { useTheme } from '@keg-hub/re-theme';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList.native-70068878.js';

var Icon = React__default.forwardRef(function (props, ref) {
  var theme = useTheme();
  var className = props.className,
      color = props.color,
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
  return React__default.createElement(View, {
    className: useClassList(),
    style: iconStyles.container
  }, renderFromType(Element, _objectSpread2(_objectSpread2({}, attrs), iconProps)));
});

export { Icon };
//# sourceMappingURL=icon.js.map
