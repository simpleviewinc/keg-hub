import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, noPropObj } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import './colors-13c6a916.js';
import { g as getPlatform } from './getPlatform-95568099.js';
import React__default from 'react';
import { isValidComponent } from './isValidComponent.js';
import { renderFromType } from './renderFromType.js';
import './getPressHandler.js';
import './ensureClassArray.js';
import './getActiveOpacity.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-a3859346.js';
import './view.native-117494a9.js';
import '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-216fa8c1.js';
import './useTextAccessibility.js';
import './kegText.native-231e3dc9.js';
import { useTheme } from '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-fd522d17.js';
import './text.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList-eea8a571.js';
import './useThemeTypeAsClass-cd54e95a.js';
import { I as Icon } from './icon-4dae6ee0.js';
import './touchable.js';
import { Button } from './button.js';
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

var isWeb = getPlatform() === 'web';
var ItemHeader = function ItemHeader(props) {
  var _headerStyles$content;
  var theme = useTheme();
  var appHeader = props.appHeader,
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
      elProps = _objectWithoutProperties(props, ["appHeader", "className", "title", "styles", "RightComponent", "CenterComponent", "LeftComponent", "onLeftClick", "leftIcon", "LeftIconComponent", "rightIcon", "RightIconComponent", "IconComponent", "onRightClick", "shadow", "ellipsis", "themePath", "children"]);
  var headerStyles = useThemePath(themePath || "header.itemHeader", styles);
  return React__default.createElement(View, _extends({
    className: useClassList('keg-header', className)
  }, elProps, {
    style: [headerStyles.main, appHeader && get(headerStyles, ['appHeader', 'main']), shadow && get(headerStyles, ['shadow', 'main'])]
  }), !isWeb  , children || React__default.createElement(React__default.Fragment, null, React__default.createElement(Side, {
    styles: headerStyles.content,
    iconName: leftIcon,
    IconElement: LeftIconComponent || IconComponent,
    action: onLeftClick
  }, LeftComponent), React__default.createElement(Center, {
    ellipsis: ellipsis,
    theme: theme,
    styles: (_headerStyles$content = headerStyles.content) === null || _headerStyles$content === void 0 ? void 0 : _headerStyles$content.center,
    title: title
  }, CenterComponent), React__default.createElement(Side, {
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
  return React__default.createElement(View, {
    className: "keg-header-center",
    style: styles.main
  }, children && renderFromType(children, {}, null) || React__default.createElement(H5, {
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
  return React__default.createElement(View, {
    className: "keg-header-".concat(position),
    style: get(styles, [position, 'main'])
  }, children && renderFromType(children, {}, null) || (action ? React__default.createElement(Button, {
    className: "keg-header-".concat(position, "-button"),
    styles: contentStyles.button,
    onClick: action
  }, showIcon && React__default.createElement(CustomIcon, iconProps)) : showIcon && React__default.createElement(View, {
    className: "keg-header-".concat(position, "-icon"),
    style: contentStyles.main
  }, React__default.createElement(CustomIcon, iconProps))));
};
var CustomIcon = function CustomIcon(props) {
  var className = props.className,
      iconName = props.iconName,
      IconElement = props.IconElement,
      position = props.position,
      styles = props.styles;
  return React__default.createElement(Icon, {
    className: className,
    name: iconName,
    Element: IconElement,
    styles: get(styles, [position, 'content', 'icon'])
  });
};

export { ItemHeader };
//# sourceMappingURL=itemHeader.js.map
