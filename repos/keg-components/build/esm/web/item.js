import { d as _objectWithoutProperties, b as _slicedToArray, e as _extends, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useCallback } from 'react';
import { get, isNum, noOp } from '@keg-hub/jsutils';
import { Touchable } from './touchable.js';
import { Text } from './text.js';
import { renderFromType } from './renderFromType.js';
import { getPressHandler } from './getPressHandler.js';
import { getActiveOpacity } from './getActiveOpacity.js';
import '@keg-hub/re-theme/colors';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass-fec5ff6f.js';
import { useThemeHover, useThemeActive } from '@keg-hub/re-theme';
import { reStyle } from '@keg-hub/re-theme/reStyle';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './kegText-5c4aeb4b.js';
import './kegText.native-be460636.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import './isValidComponent.js';
import './colors-6402d3b3.js';
import './useClassList-1d418045.js';

var getChildren = function getChildren(Children, _ref) {
  var styles = _ref.styles,
      selectable = _ref.selectable;
  return renderFromType(Children, {
    style: styles === null || styles === void 0 ? void 0 : styles.content,
    selectable: selectable
  }, Text);
};
var checkDisabled = function checkDisabled(mainStyles, btnStyles, disabled) {
  return disabled ? _objectSpread2(_objectSpread2({}, mainStyles), get(btnStyles, 'disabled.main')) : mainStyles;
};
var Button = React.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      content = props.content,
      onClick = props.onClick,
      onPress = props.onPress,
      styles = props.styles,
      _props$showFeedback = props.showFeedback,
      showFeedback = _props$showFeedback === void 0 ? false : _props$showFeedback,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      activeOpacity = props.activeOpacity,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$selectable = props.selectable,
      selectable = _props$selectable === void 0 ? false : _props$selectable,
      elProps = _objectWithoutProperties(props, ["className", "children", "content", "onClick", "onPress", "styles", "showFeedback", "type", "themePath", "activeOpacity", "disabled", "selectable"]);
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
  return React.createElement(Touchable, _extends({
    accessibilityRole: "button",
    className: useThemeTypeAsClass(themePath || type, 'keg-button', className)
  }, elProps, {
    disabled: disabled,
    touchRef: themeRef,
    showFeedback: isNum(activeOpacity) || showFeedback,
    style: checkDisabled(themeStyles.main, btnStyles, disabled),
    children: getChildren(children || content, {
      styles: themeStyles,
      selectable: selectable
    })
  }, getPressHandler(false, onClick, onPress), getActiveOpacity(false, props, btnStyles)));
});

var SelectButton = reStyle(Button, 'styles')(function (theme, props) {
  var palette = theme.colors.palette;
  var content = {
    color: palette.black01,
    fontWeight: 'normal',
    alignSelf: 'start'
  };
  var main = {
    borderRadius: 0,
    backgroundColor: palette.white01
  };
  var highlighted = _objectSpread2(_objectSpread2({}, main), {}, {
    backgroundColor: palette.gray01
  });
  return {
    default: {
      content: content,
      main: props.highlighted ? highlighted : main
    },
    active: {
      content: content,
      main: main
    },
    hover: {
      content: content,
      main: highlighted
    }
  };
});
var SelectItem = React.forwardRef(function (props, ref) {
  var item = props.item,
      _props$onSelect = props.onSelect,
      onSelect = _props$onSelect === void 0 ? noOp : _props$onSelect,
      _props$highlighted = props.highlighted,
      highlighted = _props$highlighted === void 0 ? false : _props$highlighted,
      styles = props.styles;
  var handlePress = useCallback(function () {
    return onSelect(item);
  }, [item, onSelect]);
  return React.createElement(SelectButton, {
    ref: ref,
    content: item.text,
    onPress: handlePress,
    styles: styles,
    highlighted: highlighted
  });
});

export { SelectItem };
//# sourceMappingURL=item.js.map
