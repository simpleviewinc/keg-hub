'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
var isValidComponent = require('./isValidComponent.js');
var renderFromType = require('./renderFromType.js');
require('./getPressHandler.js');
require('./getActiveOpacity.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
var view_native = require('./view.native-20f555a1.js');
require('./useTextAccessibility.js');
require('./kegText.js');
require('@keg-hub/re-theme/styleInjector');
var reTheme = require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-3f09043e.js');
require('./text.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('./useThemeTypeAsClass.native-90f04031.js');
var icon = require('./icon-3cb30f41.js');
require('./touchable.js');
require('./touchable-d386e5c0.js');
var button = require('./button.js');
require('./caption.js');
require('./h1.js');
require('./h2.js');
require('./h3.js');
require('./h4.js');
var h5 = require('./h5.js');
require('./h6.js');
require('./label.js');
require('./p.js');
require('./subtitle.js');

var ItemHeader = function ItemHeader(props) {
  var _headerStyles$shadow, _headerStyles$content;
  var theme = reTheme.useTheme();
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
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["appHeader", "className", "title", "styles", "RightComponent", "CenterComponent", "LeftComponent", "onLeftClick", "leftIcon", "LeftIconComponent", "rightIcon", "RightIconComponent", "IconComponent", "onRightClick", "shadow", "ellipsis", "themePath", "children"]);
  var headerStyles = useThemePath.useThemePath(themePath || "header.itemHeader", styles);
  return React__default.createElement(view_native.View, _rollupPluginBabelHelpers._extends({
    className: useClassList_native.useClassList()
  }, elProps, {
    style: [headerStyles.main, appHeader && jsutils.get(headerStyles, ['appHeader', 'main']), shadow && jsutils.get(headerStyles, ['shadow', 'main'])]
  }),  shadow && React__default.createElement(view_native.View, {
    style: headerStyles === null || headerStyles === void 0 ? void 0 : (_headerStyles$shadow = headerStyles.shadow) === null || _headerStyles$shadow === void 0 ? void 0 : _headerStyles$shadow.cover
  }), children || React__default.createElement(React__default.Fragment, null, React__default.createElement(Side, {
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
  return React__default.createElement(view_native.View, {
    className: "keg-header-center",
    style: styles.main
  }, children && renderFromType.renderFromType(children, {}, null) || React__default.createElement(h5.H5, {
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
  var contentStyles = jsutils.get(styles, [position, 'content'], jsutils.noPropObj);
  var iconProps = {
    styles: styles,
    IconElement: IconElement,
    iconName: iconName,
    position: position
  };
  var showIcon = isValidComponent.isValidComponent(IconElement);
  return React__default.createElement(view_native.View, {
    className: "keg-header-".concat(position),
    style: jsutils.get(styles, [position, 'main'])
  }, children && renderFromType.renderFromType(children, {}, null) || (action ? React__default.createElement(button.Button, {
    className: "keg-header-".concat(position, "-button"),
    styles: contentStyles.button,
    onClick: action
  }, showIcon && React__default.createElement(CustomIcon, iconProps)) : showIcon && React__default.createElement(view_native.View, {
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
  return React__default.createElement(icon.Icon, {
    className: className,
    name: iconName,
    Element: IconElement,
    styles: jsutils.get(styles, [position, 'content', 'icon'])
  });
};

exports.ItemHeader = ItemHeader;
//# sourceMappingURL=itemHeader.js.map
