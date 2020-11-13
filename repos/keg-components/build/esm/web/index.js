import { d as _objectWithoutProperties, b as _slicedToArray, e as _extends, a as _defineProperty, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, noOp, mapObj, toBool, isStr, checkCall } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './colors-3366b3e1.js';
import '@keg-hub/re-theme/colors';
export { theme } from './theme.js';
export { buildColorStyles, buildSurfaceStyles } from './buildColorStyles.js';
export { getStyles } from './getStyles.js';
import { g as getPlatform } from './platformFlatten-4856c5dd.js';
export { g as getPlatform, p as platformFlatten } from './platformFlatten-4856c5dd.js';
export { inheritFrom } from './inheritFrom.js';
export { buildTheme } from './buildTheme.js';
import React__default, { useState, useCallback, useRef, useEffect, useImperativeHandle, useMemo, forwardRef } from 'react';
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
export { getReadOnly } from './getReadOnly.js';
export { getTarget } from './getTarget.js';
export { handleRefUpdate } from './handleRefUpdate.js';
export { updateClassNames } from './updateClassNames.js';
export { validateFunctions } from './validateFunctions.js';
import 'react-native';
import { u as useClassName } from './useClassName-477fb4c5.js';
export { u as useClassName } from './useClassName-477fb4c5.js';
import './view.native-3802ec98.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-45334891.js';
export { V as View } from './view-45334891.js';
export { useTextAccessibility } from './useTextAccessibility.js';
import { useStyle, useTheme } from '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText.native-67183179.js';
import { K as KegText } from './kegText-a280e501.js';
import { Text as Text$1 } from './text.js';
export { Text } from './text.js';
export { u as useAnimate, a as useSpin } from './useSpin-d8f88d38.js';
export { useChildren } from './useChildren.js';
import { useChildrenWithRefs } from './useChildrenWithRefs.js';
export { useChildrenWithRefs } from './useChildrenWithRefs.js';
export { useInputHandlers } from './useInputHandlers.js';
export { useMediaProps } from './useMediaProps.js';
export { usePressHandlers } from './usePressHandlers.js';
import { useSelectHandlers } from './useSelectHandlers.js';
export { useSelectHandlers } from './useSelectHandlers.js';
import { useThemePath } from './useThemePath.js';
export { useThemePath } from './useThemePath.js';
export { useThemeWithHeight } from './useThemeWithHeight.js';
export { useFromToAnimation } from './useFromToAnimation.js';
import { u as useClassList } from './useClassList-4be992cd.js';
export { u as useClassList } from './useClassList-4be992cd.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass-56c26a32.js';
export { u as useThemeTypeAsClass } from './useThemeTypeAsClass-56c26a32.js';
import { I as Icon } from './icon-4977e155.js';
export { I as Icon } from './icon-4977e155.js';
import { Touchable } from './touchable.js';
export { Touchable } from './touchable.js';
export { withTouch } from './withTouch.js';
export { TouchableIcon } from './touchableIcon.js';
import 'react-native-svg';
import './svgIcon-8c133388.js';
import './checkbox.wrapper-145d653b.js';
import { S as Select$1, C as ChevronDown } from './select-e84bb2e6.js';
export { TextBox } from './textBox.js';
import { Button } from './button.js';
export { Button } from './button.js';
import './cardCallout.js';
import './cardContent.js';
import './cardContainer.js';
import './cardSection.js';
import './indicator.wrapper-78896af6.js';
export { Loading } from './loading.js';
import './image-e324b55c.js';
export { I as Image } from './cardMedia-02f1960d.js';
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
import { I as Input$1 } from './input.web-00da1b52.js';
import { C as Checkbox } from './checkbox-b6936d71.js';
export { C as Checkbox } from './checkbox-b6936d71.js';
import './input-74e243cf.js';
import { I as Input$2 } from './input-6b9055a2.js';
export { I as Input } from './input-6b9055a2.js';
import { S as Switch$1 } from './switch-18f76995.js';
import './container.js';
export { Row } from './row.js';
export { Grid } from './grid.js';
export { Column } from './column.js';
import { L as LinkWrapper } from './link.wrapper-f4daafc0.js';
export { Section } from './section.js';
export { Modal } from './modal.js';
export { ItemHeader } from './itemHeader.js';
export { AppHeader } from './appHeader.js';
export { ScrollView } from './scrollView.js';
export { Drawer } from './drawer.js';
export { TextToggle } from './textToggle.js';
export { SvgIcon } from './svgIcon.js';

var Input = StyleInjector(Input$1, {
  displayName: 'FilePickerInput',
  className: 'keg-file-picker-input'
});
var FilePicker = React__default.forwardRef(function (props, _ref) {
  var className = props.className,
      onChange = props.onChange,
      title = props.title,
      children = props.children,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$showFile = props.showFile,
      showFile = _props$showFile === void 0 ? true : _props$showFile,
      onFilePicked = props.onFilePicked,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? 'filePicker.default' : _props$themePath,
      _props$buttonThemePat = props.buttonThemePath,
      buttonThemePath = _props$buttonThemePat === void 0 ? 'button.contained.default' : _props$buttonThemePat,
      capture = props.capture,
      _props$openOnMount = props.openOnMount,
      openOnMount = _props$openOnMount === void 0 ? false : _props$openOnMount,
      args = _objectWithoutProperties(props, ["className", "onChange", "title", "children", "style", "showFile", "onFilePicked", "themePath", "buttonThemePath", "capture", "openOnMount"]);
  var componentTheme = useThemePath(themePath);
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      file = _useState2[0],
      setFile = _useState2[1];
  var handleInputChange = useCallback(function (event) {
    onChange && onChange(event);
    var file = event.target.files[0];
    file && onFilePicked && onFilePicked(file);
    file && setFile(file);
  }, [onChange, onFilePicked, setFile]);
  var refToInput = useRef();
  var clickInput = useCallback(function () {
    return refToInput.current && refToInput.current.click();
  }, [refToInput]);
  useEffect(function () {
    openOnMount && clickInput();
  }, []);
  return React__default.createElement(View, {
    className: useThemeTypeAsClass(themePath || type, 'keg-filepicker', className),
    style: [get(componentTheme, 'main'), style]
  }, React__default.createElement(Button, {
    content: title,
    onClick: clickInput,
    style: get(componentTheme, 'content.button'),
    themePath: buttonThemePath
  }, children),
  showFile && React__default.createElement(P, {
    style: get(componentTheme, 'content.file')
  }, file.name), React__default.createElement(Input, _extends({}, args, {
    ref: function ref(input) {
      _ref && (_ref.current = input);
      refToInput.current = input;
    },
    onChange: handleInputChange,
    style: get(componentTheme, 'content.input'),
    type: "file",
    capture: capture
  })));
});

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
    className: useClassList('keg-check-group', className),
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
    className: useClassList('keg-form', className)
  }, elProps, {
    style: [get(theme, 'form.form.default'), formTheme, style],
    ref: ref
  }), children);
});

var Option = function Option(props) {
  var children = props.children,
      label = props.label,
      style = props.style,
      text = props.text,
      value = props.value,
      args = _objectWithoutProperties(props, ["children", "label", "style", "text", "value"]);
  return React__default.createElement("option", _extends({}, args, {
    value: value || label || text
  }), label || value || text || children);
};

var Radio = function Radio(props) {
  return React__default.createElement(Input$2, _extends({}, props, {
    type: "radio"
  }));
};

var KegSelect = StyleInjector(Select$1, {
  displayName: 'Select',
  className: 'keg-select'
});
var getValue = function getValue(props) {
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
  var selectClasses = useThemeTypeAsClass(themePath || type, 'keg-select', className);
  var classRef = useClassName('keg-select', selectClasses, ref);
  return React__default.createElement(View, {
    style: [selectStyles.main, style]
  }, React__default.createElement(KegSelect, _extends({
    ref: classRef
  }, elProps, {
    enabled: !disabled,
    style: [selectStyles.select]
  }, getValue(props), useSelectHandlers({
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
  var typeClassName = useThemeTypeAsClass(elThemePath || type, 'keg-switch', className);
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
    className: useClassList('keg-link', className)
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

export { Link as A, CheckGroup, FilePicker, Form, Link, Option, Radio, Select, Slider, Switch };
//# sourceMappingURL=index.js.map
