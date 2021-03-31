import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { useTheme } from '@keg-hub/re-theme';
import { get, noPropObj } from '@keg-hub/jsutils';
import { V as View } from './view-2274aefb.js';
import { Button } from './button.js';
import { I as Icon } from './icon-f1144e8a.js';
import './caption.js';
import './h1.js';
import './h2.js';
import './h3.js';
import './h4.js';
import { H5 } from './h5.js';
import './h6.js';
import './label.js';
import './p.js';
import './subtitle.js';
import './text.js';
import { renderFromType } from './renderFromType.js';
import { g as getPlatform } from './getPlatform-95568099.js';
import '@keg-hub/re-theme/colors';
import { isValidComponent } from './isValidComponent.js';
import { u as useClassList } from './useClassList-1d418045.js';
import { useAccessibilityRole } from './useAccessibilityRole.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import './view.native-a7f08b5b.js';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './touchable.js';
import './getPressHandler.js';
import './getActiveOpacity.js';
import './useThemeTypeAsClass-fec5ff6f.js';
import './colors-6402d3b3.js';
import './kegText-5c4aeb4b.js';
import './kegText.native-be460636.js';
import './useTextAccessibility.js';
import './useTextStyles.js';

var isWeb = getPlatform() === 'web';
var ItemHeader = function ItemHeader(props) {
  var _headerStyles$content;
  var theme = useTheme();
  var accessibilityRole = props.accessibilityRole,
      appHeader = props.appHeader,
      className = props.className,
      title = props.title,
      styles = props.styles,
      RightComponent = props.RightComponent,
      CenterComponent = props.CenterComponent,
      LeftComponent = props.LeftComponent,
      onLeftClick = props.onLeftClick,
      leftIcon = props.leftIcon,
      LeftIconComponent = props.LeftIconComponent,
      rightIcon = props.rightIcon,
      RightIconComponent = props.RightIconComponent,
      IconComponent = props.IconComponent,
      onRightClick = props.onRightClick,
      shadow = props.shadow,
      ellipsis = props.ellipsis,
      themePath = props.themePath,
      children = props.children,
      elProps = _objectWithoutProperties(props, ["accessibilityRole", "appHeader", "className", "title", "styles", "RightComponent", "CenterComponent", "LeftComponent", "onLeftClick", "leftIcon", "LeftIconComponent", "rightIcon", "RightIconComponent", "IconComponent", "onRightClick", "shadow", "ellipsis", "themePath", "children"]);
  var headerStyles = useThemePath(themePath || "header.itemHeader", styles);
  var accessibilityRoleObj = useAccessibilityRole(accessibilityRole, 'header');
  return React.createElement(View, _extends({
    className: useClassList('keg-header', className)
  }, elProps, accessibilityRoleObj, {
    style: [headerStyles.main, appHeader && get(headerStyles, ['appHeader', 'main']), shadow && get(headerStyles, ['shadow', 'main'])]
  }), !isWeb  , children || React.createElement(React.Fragment, null, React.createElement(Side, {
    styles: headerStyles.content,
    iconName: leftIcon,
    IconElement: LeftIconComponent || IconComponent,
    action: onLeftClick
  }, LeftComponent), React.createElement(Center, {
    ellipsis: ellipsis,
    theme: theme,
    styles: (_headerStyles$content = headerStyles.content) === null || _headerStyles$content === void 0 ? void 0 : _headerStyles$content.center,
    title: title
  }, CenterComponent), React.createElement(Side, {
    right: true,
    styles: headerStyles.content,
    iconName: rightIcon,
    IconElement: RightIconComponent || IconComponent,
    action: onRightClick
  }, RightComponent)));
};
var Center = function Center(props) {
  var styles = props.styles,
      title = props.title,
      _props$ellipsis = props.ellipsis,
      ellipsis = _props$ellipsis === void 0 ? true : _props$ellipsis,
      children = props.children;
  return React.createElement(View, {
    className: "keg-header-center",
    style: styles.main
  }, children && renderFromType(children, {}, null) || React.createElement(H5, {
    className: "keg-header-center-title",
    ellipsis: ellipsis,
    style: styles.content.title
  }, title));
};
var Side = function Side(props) {
  var styles = props.styles,
      iconName = props.iconName,
      IconElement = props.IconElement,
      action = props.action,
      children = props.children,
      right = props.right;
  var position = right ? 'right' : 'left';
  var contentStyles = get(styles, [position, 'content'], noPropObj);
  var iconProps = {
    styles: styles,
    IconElement: IconElement,
    iconName: iconName,
    position: position
  };
  var showIcon = isValidComponent(IconElement);
  return React.createElement(View, {
    className: "keg-header-".concat(position),
    style: get(styles, [position, 'main'])
  }, children && renderFromType(children, {}, null) || (action ? React.createElement(Button, {
    className: "keg-header-".concat(position, "-button"),
    styles: contentStyles.button,
    onClick: action
  }, showIcon && React.createElement(CustomIcon, iconProps)) : showIcon && React.createElement(View, {
    className: "keg-header-".concat(position, "-icon"),
    style: contentStyles.main
  }, React.createElement(CustomIcon, iconProps))));
};
var CustomIcon = function CustomIcon(props) {
  var className = props.className,
      iconName = props.iconName,
      IconElement = props.IconElement,
      position = props.position,
      styles = props.styles;
  return React.createElement(Icon, {
    className: className,
    name: iconName,
    Element: IconElement,
    styles: get(styles, [position, 'content', 'icon'])
  });
};

export { ItemHeader };
//# sourceMappingURL=itemHeader.js.map
