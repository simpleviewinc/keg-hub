import { d as _objectWithoutProperties, b as _slicedToArray, e as _extends, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './buildColorStyles-a1255086.js';
import '@keg-hub/re-theme/colors';
import './platformFlatten-50b3991b.js';
import './buildTheme.js';
import React__default from 'react';
import './isValidComponent.js';
import { renderFromType } from './renderFromType.js';
import { getPressHandler } from './getPressHandler.js';
import { getActiveOpacity } from './getActiveOpacity.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './useTextAccessibility.js';
import { useThemeHover, useThemeActive } from '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText.js';
import '@keg-hub/re-theme/styleInjector';
import './kegText-897ccc29.js';
import { Text } from './text.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass.native-a05b9a50.js';
import './touchable.js';
import { T as Touchable } from './touchable-1df02cd6.js';

var getChildren = function getChildren(Children) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return renderFromType(Children, {
    style: styles.content
  }, Text);
};
var checkDisabled = function checkDisabled(mainStyles, btnStyles, disabled) {
  return disabled ? _objectSpread2(_objectSpread2({}, mainStyles), get(btnStyles, 'disabled.main')) : mainStyles;
};
var Button = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      content = props.content,
      onClick = props.onClick,
      onPress = props.onPress,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      elProps = _objectWithoutProperties(props, ["className", "children", "content", "onClick", "onPress", "styles", "type", "themePath"]);
  var btnStyles = useThemePath(themePath || "button.contained.".concat(type), styles);
  var _useThemeHover = useThemeHover(get(btnStyles, 'default', {}), get(btnStyles, 'hover'), {
    ref: ref
  }),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 2),
      hoverRef = _useThemeHover2[0],
      hoverStyles = _useThemeHover2[1];
  var _useThemeActive = useThemeActive(hoverStyles, get(btnStyles, 'active'), {
    ref: hoverRef
  }),
      _useThemeActive2 = _slicedToArray(_useThemeActive, 2),
      themeRef = _useThemeActive2[0],
      themeStyles = _useThemeActive2[1];
  return React__default.createElement(Touchable, _extends({
    accessibilityRole: "button",
    className: useThemeTypeAsClass()
  }, elProps, {
    touchRef: themeRef,
    style: checkDisabled(themeStyles.main, btnStyles, props.disabled),
    children: getChildren(children || content, themeStyles)
  }, getPressHandler(false, onClick, onPress), getActiveOpacity(false, props, btnStyles)));
});

export { Button };
//# sourceMappingURL=button.js.map
