import { d as _objectWithoutProperties, e as _extends, b as _slicedToArray, a as _defineProperty, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { noOp, mapObj, get, isStr, isNum, toBool, checkCall } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
export { a as buildColorStyles, b as buildSurfaceStyles } from './buildColorStyles-a1255086.js';
import '@keg-hub/re-theme/colors';
export { theme } from './theme.js';
export { getStyles } from './getStyles.js';
import { g as getPlatform } from './platformFlatten-50b3991b.js';
export { g as getPlatform, p as platformFlatten } from './platformFlatten-50b3991b.js';
export { inheritFrom } from './inheritFrom.js';
export { buildTheme } from './buildTheme.js';
import React__default, { useImperativeHandle, useMemo, useCallback, forwardRef, useState } from 'react';
export { isValidComponent } from './isValidComponent.js';
import { renderFromType } from './renderFromType.js';
export { renderFromType } from './renderFromType.js';
export { getOnLoad } from './getOnLoad.js';
import { getOnChangeHandler } from './getOnChangeHandler.js';
export { getOnChangeHandler } from './getOnChangeHandler.js';
export { getPressHandler } from './getPressHandler.js';
export { ensureClassArray } from './ensureClassArray.js';
export { getActiveOpacity } from './getActiveOpacity.js';
import { getChecked } from './getChecked.js';
export { getChecked } from './getChecked.js';
export { getImgSrc } from './getImgSrc.js';
import { getValueFromChildren, getInputValueKey } from './getInputValue.js';
export { getInputValueKey, getValueFromChildren } from './getInputValue.js';
import { getReadOnly } from './getReadOnly.js';
export { getReadOnly } from './getReadOnly.js';
export { getTarget } from './getTarget.js';
export { handleRefUpdate } from './handleRefUpdate.js';
export { updateClassNames } from './updateClassNames.js';
export { validateFunctions } from './validateFunctions.js';
import { Picker } from 'react-native';
import { u as useClassName } from './useClassName.native-32e8827d.js';
export { u as useClassName } from './useClassName.native-32e8827d.js';
import { V as View } from './view.native-54e7e7ef.js';
export { V as View } from './view.native-54e7e7ef.js';
export { useTextAccessibility } from './useTextAccessibility.js';
import { useStyle, useTheme, withTheme } from '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { K as KegText } from './kegText-897ccc29.js';
import { Text as Text$1 } from './text.js';
export { Text } from './text.js';
export { u as useAnimate, a as useSpin } from './useSpin-240deec7.js';
export { useChildren } from './useChildren.js';
import { useChildrenWithRefs } from './useChildrenWithRefs.js';
export { useChildrenWithRefs } from './useChildrenWithRefs.js';
import { useInputHandlers } from './useInputHandlers.js';
export { useInputHandlers } from './useInputHandlers.js';
export { useMediaProps } from './useMediaProps.js';
import { usePressHandlers } from './usePressHandlers.js';
export { usePressHandlers } from './usePressHandlers.js';
import { useSelectHandlers } from './useSelectHandlers.js';
export { useSelectHandlers } from './useSelectHandlers.js';
import { useThemePath } from './useThemePath.js';
export { useThemePath } from './useThemePath.js';
export { useThemeWithHeight } from './useThemeWithHeight.js';
export { useFromToAnimation } from './useFromToAnimation.js';
import { u as useClassList } from './useClassList.native-70068878.js';
export { u as useClassList } from './useClassList.native-70068878.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass.native-a05b9a50.js';
export { u as useThemeTypeAsClass } from './useThemeTypeAsClass.native-a05b9a50.js';
import { I as Icon } from './icon-a1faf596.js';
export { I as Icon } from './icon-a1faf596.js';
import './touchable.js';
import { T as Touchable } from './touchable-1df02cd6.js';
export { T as Touchable } from './touchable-1df02cd6.js';
export { withTouch } from './withTouch.js';
export { TouchableIcon } from './touchableIcon.js';
import 'react-native-svg';
import './svgIcon-8c133388.js';
import { C as Checkbox } from './checkbox-2d098169.js';
export { C as Checkbox } from './checkbox-2d098169.js';
import { S as Select$1, C as ChevronDown } from './select-31dcb40f.js';
export { TextBox } from './textBox.js';
export { Button } from './button.js';
import './cardCallout.js';
import './cardContent.js';
import './cardContainer.js';
import './cardSection.js';
import './indicator.wrapper-10cadcb1.js';
export { Loading } from './loading.js';
import './image-209e0d5e.js';
export { I as Image } from './cardMedia-e93e71a8.js';
export { Card } from './card.js';
export { Divider } from './divider.js';
export { Caption } from './caption.js';
export { H1 } from './h1.js';
export { H2 } from './h2.js';
export { H3 } from './h3.js';
export { H4 } from './h4.js';
export { H5 } from './h5.js';
export { H6 } from './h6.js';
export { Label } from './label.js';
import { P } from './p.js';
export { P } from './p.js';
export { Subtitle } from './subtitle.js';
import './checkbox.wrapper-04e2db61.js';
import { I as Input$1 } from './input-fe053d8d.js';
import { S as Switch$1 } from './switch-09146b4a.js';
import './container.js';
export { Row } from './row.js';
export { Grid } from './grid.js';
export { Column } from './column.js';
import { L as LinkWrapper } from './link.wrapper-7a3c63e6.js';
export { Section } from './section.js';
export { Modal } from './modal.js';
export { ItemHeader } from './itemHeader.js';
export { AppHeader } from './appHeader.js';
import { ScrollView as ScrollView$1 } from './scrollView.js';
export { Drawer } from './drawer.js';
import 'react-native-linear-gradient';
export { TextToggle } from './textToggle.js';
export { SvgIcon } from './svgIcon.js';

var FilePicker = function FilePicker(props) {
  return React__default.createElement(View, null, React__default.createElement(P, null, "FilePicker Not yet implemented for native."));
};

var SimpleHeader = React__default.forwardRef(function (props, ref) {
  var title = props.title,
      className = props.className,
      style = props.style,
      rest = _objectWithoutProperties(props, ["title", "className", "style"]);
  useImperativeHandle(ref, function () {
    return {
      isChecked: undefined,
      setChecked: noOp
    };
  });
  var textStyle = useStyle('form.checkGroup.simpleHeader.main', style);
  return React__default.createElement(Text$1, _extends({
    className: className,
    style: textStyle
  }, rest), title);
});
var CheckboxHeader = React__default.forwardRef(function (props, ref) {
  var title = props.title,
      className = props.className,
      style = props.style,
      onPress = props.onPress,
      checked = props.checked;
  var headerStyles = useMemo(function () {
    return {
      main: style,
      content: {
        right: {}
      }
    };
  }, [style]);
  var onChangeHandler = useCallback(function (_, val) {
    return onPress === null || onPress === void 0 ? void 0 : onPress(val);
  }, [onPress]);
  return React__default.createElement(Checkbox, {
    RightComponent: title,
    rightClassName: className,
    styles: headerStyles,
    checked: checked,
    onChange: onChangeHandler,
    ref: ref,
    close: true
  });
});
var CheckGroup = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      headerClassName = props.headerClassName,
      title = props.title,
      children = props.children,
      styles = props.styles,
      _props$initChecked = props.initChecked,
      initChecked = _props$initChecked === void 0 ? false : _props$initChecked,
      onGroupPress = props.onGroupPress,
      _props$showHeaderChec = props.showHeaderCheckbox,
      showHeaderCheckbox = _props$showHeaderChec === void 0 ? false : _props$showHeaderChec,
      _props$showHeader = props.showHeader,
      showHeader = _props$showHeader === void 0 ? true : _props$showHeader;
  var groupStyles = useStyle('form.checkGroup', styles);
  var _useChildrenWithRefs = useChildrenWithRefs(children, showHeaderCheckbox),
      _useChildrenWithRefs2 = _slicedToArray(_useChildrenWithRefs, 2),
      childrenWithProps = _useChildrenWithRefs2[0],
      childRefs = _useChildrenWithRefs2[1];
  var headerCheckHandler = useCallback(function (checked) {
    onGroupPress === null || onGroupPress === void 0 ? void 0 : onGroupPress(checked);
    mapObj(childRefs.current, function (_, child) {
      var _child$setChecked;
      return child === null || child === void 0 ? void 0 : (_child$setChecked = child.setChecked) === null || _child$setChecked === void 0 ? void 0 : _child$setChecked.call(child, checked);
    });
  }, [childRefs]);
  var Header = function Header() {
    return showHeaderCheckbox ? React__default.createElement(CheckboxHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      onPress: showHeaderCheckbox && headerCheckHandler,
      checked: showHeaderCheckbox ? initChecked : undefined,
      ref: ref
    }) : React__default.createElement(SimpleHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      ref: ref
    });
  };
  return React__default.createElement(View, {
    className: useClassList(),
    style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.main
  }, showHeader && React__default.createElement(Header, null), childrenWithProps);
});
CheckGroup.Item = Checkbox;

var Form = React__default.forwardRef(function (props, ref) {
  var theme = useTheme();
  var children = props.children,
      className = props.className,
      elType = props.elType,
      style = props.style,
      type = props.type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.form.".concat(type || 'default') : _props$themePath,
      elProps = _objectWithoutProperties(props, ["children", "className", "elType", "style", "type", "themePath"]);
  var formTheme = useThemePath(themePath);
  return React__default.createElement(View, _extends({
    accessibilityRole: "form",
    className: useClassList()
  }, elProps, {
    style: [get(theme, 'form.form.default'), formTheme, style],
    ref: ref
  }), children);
});

var KegInput = StyleInjector(Input$1, {
  displayName: 'Input',
  className: 'keg-input'
});
var getValue = function getValue(_ref) {
  var children = _ref.children,
      value = _ref.value;
  var setValue = getValueFromChildren(value, children);
  return value !== undefined ? {
    value: setValue
  } : {};
};
var Input = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$editable = props.editable,
      editable = _props$editable === void 0 ? true : _props$editable,
      Element = props.Element,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      onChangeText = props.onChangeText,
      onClick = props.onClick,
      onPress = props.onPress,
      _props$readOnly = props.readOnly,
      readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.input.".concat(type) : _props$themePath,
      style = props.style,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["className", "children", "disabled", "editable", "Element", "onChange", "onValueChange", "onChangeText", "onClick", "onPress", "readOnly", "type", "themePath", "style", "value"]);
  var inputStyles = useThemePath(themePath);
  return React__default.createElement(KegInput, _extends({
    accessibilityRole: "textbox",
    onPress: onPress
  }, getReadOnly(false, readOnly, disabled, editable), getValue(props), useInputHandlers({
    onChange: onChange,
    onValueChange: onValueChange,
    onChangeText: onChangeText
  }), usePressHandlers(false, {
    onClick: onClick,
    onPress: onPress
  }), elProps, {
    style: [inputStyles, style],
    ref: ref
  }));
});

var SelectOption = Picker.Item;
var useable = function useable(item) {
  return (isStr(item) || isNum(item)) && item;
};
var getVal = function getVal(value, text, children, label) {
  return useable(value) || useable(text) || useable(children) || useable(label);
};
var Option = function Option(props) {
  var label = props.label,
      children = props.children,
      text = props.text,
      value = props.value;
  return React__default.createElement(SelectOption, {
    label: getVal(label, value, text),
    value: getVal(value, text, children, label)
  });
};

var Radio = withTheme(function (props) {
  var theme = props.theme,
      children = props.children,
      style = props.style,
      onClick = props.onClick,
      onPress = props.onPress,
      text = props.text,
      args = _objectWithoutProperties(props, ["theme", "children", "style", "onClick", "onPress", "text"]);
  return React__default.createElement(Text$1, _extends({}, args, {
    style: [get(theme, ['form', 'radio']), style]
  }), text);
});

var KegSelect = StyleInjector(Select$1, {
  displayName: 'Select',
  className: 'keg-select'
});
var getValue$1 = function getValue(props) {
  var children = props.children,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      readOnly = props.readOnly,
      value = props.value;
  var setValue = getValueFromChildren(value, children);
  var valKey = getInputValueKey(false, onChange, onValueChange, readOnly);
  return _defineProperty({}, valKey, setValue);
};
var Select = React__default.forwardRef(function (props, ref) {
  var _selectStyles$icon, _selectStyles$icon$di;
  var className = props.className,
      children = props.children,
      disabled = props.disabled,
      readOnly = props.readOnly,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      style = props.style,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.select.".concat(type) : _props$themePath,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["className", "children", "disabled", "readOnly", "onChange", "onValueChange", "style", "styles", "type", "themePath", "value"]);
  var selectStyles = useThemePath(themePath, styles);
  var selectClasses = useThemeTypeAsClass();
  var classRef = useClassName('keg-select', selectClasses, ref);
  return React__default.createElement(View, {
    style: [selectStyles.main, style]
  }, React__default.createElement(KegSelect, _extends({
    ref: classRef
  }, elProps, {
    enabled: !disabled,
    style: [selectStyles.select]
  }, getValue$1(props), useSelectHandlers({
    onChange: onChange,
    onValueChange: onValueChange
  })), children), React__default.createElement(Icon, {
    styles: selectStyles.icon,
    Component: ChevronDown,
    color: disabled && ((_selectStyles$icon = selectStyles.icon) === null || _selectStyles$icon === void 0 ? void 0 : (_selectStyles$icon$di = _selectStyles$icon.disabled) === null || _selectStyles$icon$di === void 0 ? void 0 : _selectStyles$icon$di.color)
  }));
});

var Slider = function Slider() {
  return null;
};

var KegSwitch = StyleInjector(Switch$1, {
  displayName: 'Switch',
  className: 'keg-switch'
});
var getSwitchColors = function getSwitchColors(thumbColor, trackColor, _ref) {
  var _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === void 0 ? {} : _ref$indicator,
      _ref$area = _ref.area,
      area = _ref$area === void 0 ? {} : _ref$area;
  var indicatorColor = thumbColor || indicator.color;
  var areaColor = trackColor || area.backgroundColor;
  var colors = _objectSpread2(_objectSpread2({}, indicatorColor && {
    thumbColor: thumbColor || color
  }), areaColor && {
    trackColor: areaColor,
    onTintColor: areaColor
  });
  return colors;
};
var useCheckedState = function useCheckedState(isChecked, themeStyles) {
  var theme = useTheme();
  return useMemo(function () {
    return theme.join(themeStyles, {
      content: {
        area: _objectSpread2(_objectSpread2({}, get(themeStyles, 'content.area.off')), isChecked && get(themeStyles, 'content.area.on')),
        indicator: _objectSpread2(_objectSpread2({}, get(themeStyles, 'content.indicator.off')), isChecked && get(themeStyles, 'content.indicator.on'))
      }
    });
  }, [isChecked]);
};
var setCheckedValue = function setCheckedValue(isChecked, setChecked, onChange) {
  return function (event) {
    setChecked(!isChecked);
    checkCall(onChange, event, !isChecked);
  };
};
var SideComponent = function SideComponent(_ref2) {
  var Component = _ref2.Component,
      style = _ref2.style;
  return isStr(Component) ? React__default.createElement(Text$1, {
    style: style
  }, Component) : renderFromType(Component, {
    style: styles.content
  });
};
var ChildrenComponent = function ChildrenComponent(_ref3) {
  var children = _ref3.children;
  return React__default.createElement(React__default.Fragment, null, renderFromType(children, {}, null));
};
var useSwitchHandle = function useSwitchHandle(ref, isChecked, setChecked) {
  return useImperativeHandle(ref, function () {
    return {
      isChecked: isChecked,
      setChecked: setChecked
    };
  }, [ref, isChecked, setChecked]);
};
var Switch = forwardRef(function (props, ref) {
  var className = props.className,
      checked = props.checked,
      children = props.children,
      elType = props.elType,
      disabled = props.disabled,
      LeftComponent = props.LeftComponent,
      close = props.close,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      RightComponent = props.RightComponent,
      styles = props.styles,
      SwitchComponent = props.SwitchComponent,
      setCheckedSetter = props.setCheckedSetter,
      type = props.type,
      themePath = props.themePath,
      thumbColor = props.thumbColor,
      trackColor = props.trackColor,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["className", "checked", "children", "elType", "disabled", "LeftComponent", "close", "onChange", "onValueChange", "RightComponent", "styles", "SwitchComponent", "setCheckedSetter", "type", "themePath", "thumbColor", "trackColor", "value"]);
  var _useState = useState(toBool(checked || value)),
      _useState2 = _slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setChecked = _useState2[1];
  useSwitchHandle(ref, isChecked, setChecked);
  var elThemePath = themePath || "form.switch.".concat(close && 'close' || 'default');
  var themeStyles = useThemePath(elThemePath, styles);
  var activeStyles = useCheckedState(isChecked, themeStyles);
  var typeClassName = useThemeTypeAsClass();
  return children && React__default.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, React__default.createElement(ChildrenComponent, {
    className: "keg-switch-container",
    children: children
  })) || React__default.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, LeftComponent && React__default.createElement(SideComponent, {
    className: "keg-switch-left",
    Component: LeftComponent,
    style: activeStyles.content.left
  }), SwitchComponent ? renderFromType(SwitchComponent, _objectSpread2(_objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React__default.createElement(KegSwitch, _extends({
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content
  }, getSwitchColors(thumbColor, trackColor, activeStyles.content), getChecked(false, isChecked), getOnChangeHandler(false, setCheckedValue(isChecked, setChecked, onChange || onValueChange)))), RightComponent && React__default.createElement(SideComponent, {
    className: "keg-switch-right",
    Component: RightComponent,
    style: activeStyles.content.right
  }));
});

var isWeb = getPlatform() === 'web';
var Text = KegText('link');
var Element = React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href,
      onPress = props.onPress,
      style = props.style,
      target = props.target,
      attrs = _objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React__default.createElement(Touchable, _extends({
    className: useClassList()
  }, elProps, attrs, {
    touchRef: ref
  }), React__default.createElement(Text, {
    accessibilityRole: "link",
    className: "keg-link-text",
    style: style,
    href: href,
    target: target
  }, children));
});
var Link = function Link(props) {
  return React__default.createElement(LinkWrapper, _extends({}, props, {
    Element: Element,
    isWeb: isWeb
  }));
};

var ScrollView = StyleInjector(ScrollView$1, {
  displayName: 'Scroll-View',
  className: 'keg-scrollview'
});
ScrollView.propTypes = ScrollView$1.propTypes;

export { Link as A, CheckGroup, FilePicker, Form, Input, Link, Option, Radio, ScrollView, Select, Slider, Switch };
//# sourceMappingURL=index.js.map
