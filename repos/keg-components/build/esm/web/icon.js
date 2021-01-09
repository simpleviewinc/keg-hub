import { d as _objectWithoutProperties, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import React__default from 'react';
import { isValidComponent } from './isValidComponent.js';
import { renderFromType } from './renderFromType.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-a3859346.js';
import './view.native-117494a9.js';
import '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-216fa8c1.js';
import { useTheme } from '@keg-hub/re-theme';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList-eea8a571.js';

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
    className: useClassList("keg-icon", className),
    style: iconStyles.container
  }, renderFromType(Element, _objectSpread2(_objectSpread2({}, attrs), iconProps)));
});

export { Icon };
//# sourceMappingURL=icon.js.map
