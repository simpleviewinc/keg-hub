export { TextBox } from './textBox.js';
import { Button } from './button.js';
export { Button } from './button.js';
export { Card } from './card.js';
export { Divider } from './divider.js';
import { b as _slicedToArray, d as _objectWithoutProperties, e as _extends, a as _defineProperty, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useState, useCallback, useEffect, useRef, useImperativeHandle, useMemo, forwardRef } from 'react';
import { get, noOp, mapObj, toBool, isStr, checkCall } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { useThemePath } from './useThemePath.js';
export { useThemePath } from './useThemePath.js';
export { useThemeWithHeight } from './useThemeWithHeight.js';
import 'react-native';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass-fec5ff6f.js';
export { u as useThemeTypeAsClass } from './useThemeTypeAsClass-fec5ff6f.js';
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
import { Text as Text$1 } from './text.js';
export { Text } from './text.js';
import { V as View } from './view-2274aefb.js';
export { V as View } from './view-2274aefb.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { I as Input$1 } from './input.web-14b4a9e4.js';
import { C as Checkbox } from './checkbox-f5a5bba5.js';
export { C as Checkbox } from './checkbox-f5a5bba5.js';
import { useStyle, useTheme } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList-1d418045.js';
export { u as useClassList } from './useClassList-1d418045.js';
import { useChildrenWithRefs } from './useChildrenWithRefs.js';
export { useChildrenWithRefs } from './useChildrenWithRefs.js';
import { I as Input$2 } from './input-92fdaee4.js';
export { I as Input } from './input-92fdaee4.js';
import { S as Select$1, C as ChevronDown } from './select-2bbcc7c9.js';
import { getValueFromChildren, getInputValueKey } from './getInputValue.js';
export { getInputValueKey, getValueFromChildren } from './getInputValue.js';
import { useSelectHandlers } from './useSelectHandlers.js';
export { useSelectHandlers } from './useSelectHandlers.js';
import { u as useClassName } from './useClassName-682bc33b.js';
export { u as useClassName } from './useClassName-682bc33b.js';
import 'react-native-svg';
import { I as Icon } from './icon-f1144e8a.js';
export { I as Icon } from './icon-f1144e8a.js';
import { renderFromType } from './renderFromType.js';
export { renderFromType } from './renderFromType.js';
import { getOnChangeHandler } from './getOnChangeHandler.js';
export { getOnChangeHandler } from './getOnChangeHandler.js';
import { getChecked } from './getChecked.js';
export { getChecked } from './getChecked.js';
import { S as Switch$1 } from './switch-86c64b60.js';
export { TouchableIcon } from './touchableIcon.js';
export { I as Image } from './cardMedia-c0f34d5d.js';
export { Grid } from './grid.js';
export { Row } from './row.js';
export { Column } from './column.js';
import { L as LinkWrapper } from './link.wrapper-3ac32a3b.js';
import { K as KegText } from './kegText-5c4aeb4b.js';
import { Touchable } from './touchable.js';
export { Touchable } from './touchable.js';
import { g as getPlatform } from './getPlatform-95568099.js';
export { g as getPlatform } from './getPlatform-95568099.js';
export { Loading } from './loading.js';
export { Section } from './section.js';
export { Modal } from './modal.js';
export { ItemHeader } from './itemHeader.js';
export { AppHeader } from './appHeader.js';
export { ScrollView } from './scrollView.js';
export { S as SectionList, g as getElementLayout, s as scrollList, u as useScroll } from './sectionList-27c85452.js';
export { Drawer } from './drawer.js';
export { TextToggle } from './textToggle.js';
export { SvgIcon } from './svgIcon.js';
export { withTouch } from './withTouch.js';
export { u as useScrollIntoView, w as withScrollIntoView } from './withScrollIntoView-5f891320.js';
export { u as useOutsideDetect, w as withOutsideDetect } from './withOutsideDetect-c4848693.js';
export { theme } from './theme.js';
export { useAccessibilityRole } from './useAccessibilityRole.js';
export { u as useAnimate, a as useSpin } from './useSpin-389d72c8.js';
export { getItemsMatchingText, useAutocompleteItems } from './useAutocompleteItems.js';
export { useChildren } from './useChildren.js';
export { useInputHandlers } from './useInputHandlers.js';
export { useMediaProps } from './useMediaProps.js';
export { usePressHandlers } from './usePressHandlers.js';
export { useTextAccessibility } from './useTextAccessibility.js';
export { useFromToAnimation } from './useFromToAnimation.js';
export { u as useScrollClassName } from './useScrollClassName-2b12cd9f.js';
export { getOnLoad } from './getOnLoad.js';
export { getPressHandler } from './getPressHandler.js';
export { getTextFromChangeEvent } from './getTextFromChangeEvent.js';
export { ensureClassArray } from './ensureClassArray.js';
export { getActiveOpacity } from './getActiveOpacity.js';
export { getImgSrc } from './getImgSrc.js';
export { getReadOnly } from './getReadOnly.js';
export { getTarget } from './getTarget.js';
export { handleRefUpdate } from './handleRefUpdate.js';
export { updateClassNames } from './updateClassNames.js';
export { buildColorStyles, buildSurfaceStyles } from './buildColorStyles.js';
export { getStyles } from './getStyles.js';
export { inheritFrom } from './inheritFrom.js';
export { platformFlatten } from './platformFlatten.js';
export { buildTheme } from './buildTheme.js';
export { validateFunctions } from './validateFunctions.js';
export { isValidComponent } from './isValidComponent.js';
import './svgIcon-51ab090d.js';
import './cardContent.js';
import './cardCallout.js';
import './cardContainer.js';
import './cardSection.js';
import './colors-6402d3b3.js';
import './view.native-a7f08b5b.js';
import './checkbox.wrapper-7adc3d63.js';
import './input-0746c9bb.js';
import './image-fd980ec1.js';
import './container.js';
import './kegText.native-be460636.js';
import './useTextStyles.js';
import './indicator.wrapper-ddd47db5.js';
import './getScrollValues-1e13266a.js';
import './themeDefaults-ae219f8e.js';

var manageListeners = function manageListeners(upHandler, downHandler) {
  window.addEventListener('keydown', downHandler);
  window.addEventListener('keyup', upHandler);
  return function () {
    window.removeEventListener('keydown', downHandler);
    window.removeEventListener('keyup', upHandler);
  };
};
var useKeyPress = function useKeyPress(targetKey) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      keyPressed = _useState2[0],
      setKeyPressed = _useState2[1];
  var downHandler = useCallback(function (evt) {
    return evt.key === targetKey && setKeyPressed(true);
  }, [setKeyPressed, targetKey]);
  var upHandler = useCallback(function (evt) {
    return evt.key === targetKey && setKeyPressed(false);
  }, [setKeyPressed, targetKey]);
  useEffect(function () {
    return manageListeners(upHandler, downHandler);
  }, [downHandler, upHandler]);
  return keyPressed;
};

var Input = StyleInjector(Input$1, {
  displayName: 'FilePickerInput',
  className: 'keg-file-picker-input'
});
var FilePicker = React.forwardRef(function (props, _ref) {
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
  return React.createElement(View, {
    className: useThemeTypeAsClass(themePath || type, 'keg-filepicker', className),
    style: [get(componentTheme, 'main'), style]
  }, React.createElement(Button, {
    content: title,
    onClick: clickInput,
    style: get(componentTheme, 'content.button'),
    themePath: buttonThemePath
  }, children),
  showFile && React.createElement(P, {
    style: get(componentTheme, 'content.file')
  }, file.name), React.createElement(Input, _extends({}, args, {
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

var SimpleHeader = React.forwardRef(function (props, ref) {
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
  return React.createElement(Text$1, _extends({
    className: className,
    style: textStyle
  }, rest), title);
});
var CheckboxHeader = React.forwardRef(function (props, ref) {
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
  return React.createElement(Checkbox, {
    RightComponent: title,
    rightClassName: className,
    styles: headerStyles,
    checked: checked,
    onChange: onChangeHandler,
    ref: ref,
    close: true
  });
});
var CheckGroup = React.forwardRef(function (props, ref) {
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
    return showHeaderCheckbox ? React.createElement(CheckboxHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      onPress: showHeaderCheckbox && headerCheckHandler,
      checked: showHeaderCheckbox ? initChecked : undefined,
      ref: ref
    }) : React.createElement(SimpleHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      ref: ref
    });
  };
  return React.createElement(View, {
    className: useClassList('keg-check-group', className),
    style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.main
  }, showHeader && React.createElement(Header, null), childrenWithProps);
});
CheckGroup.Item = Checkbox;

var Form = React.forwardRef(function (props, ref) {
  var theme = useTheme();
  var children = props.children,
      className = props.className;
      props.elType;
      var style = props.style,
      type = props.type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.form.".concat(type || 'default') : _props$themePath,
      elProps = _objectWithoutProperties(props, ["children", "className", "elType", "style", "type", "themePath"]);
  var formTheme = useThemePath(themePath);
  return React.createElement(View, _extends({
    accessibilityRole: "form",
    className: useClassList('keg-form', className)
  }, elProps, {
    style: [get(theme, 'form.form.default'), formTheme, style],
    ref: ref
  }), children);
});

var Option = function Option(props) {
  var children = props.children,
      label = props.label;
      props.style;
      var text = props.text,
      value = props.value,
      args = _objectWithoutProperties(props, ["children", "label", "style", "text", "value"]);
  return React.createElement("option", _extends({}, args, {
    value: value || label || text
  }), label || value || text || children);
};

var Radio = function Radio(props) {
  return React.createElement(Input$2, _extends({}, props, {
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
var Select = React.forwardRef(function (props, ref) {
  var _selectStyles$icon, _selectStyles$icon$di;
  var className = props.className,
      children = props.children,
      disabled = props.disabled;
      props.readOnly;
      var onChange = props.onChange,
      onValueChange = props.onValueChange,
      style = props.style,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.select.".concat(type) : _props$themePath;
      props.value;
      var elProps = _objectWithoutProperties(props, ["className", "children", "disabled", "readOnly", "onChange", "onValueChange", "style", "styles", "type", "themePath", "value"]);
  var selectStyles = useThemePath(themePath, styles);
  var selectClasses = useThemeTypeAsClass(themePath || type, 'keg-select', className);
  var classRef = useClassName('keg-select', selectClasses, ref);
  return React.createElement(View, {
    style: [selectStyles.main, style]
  }, React.createElement(KegSelect, _extends({
    ref: classRef
  }, elProps, {
    enabled: !disabled,
    style: [selectStyles.select]
  }, getValue(props), useSelectHandlers({
    onChange: onChange,
    onValueChange: onValueChange
  })), children), React.createElement(Icon, {
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
    return theme.get(themeStyles, {
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
  return isStr(Component) ? React.createElement(Text$1, {
    style: style
  }, Component) : renderFromType(Component, {
    style: styles.content
  });
};
var ChildrenComponent = function ChildrenComponent(_ref3) {
  var children = _ref3.children;
  return React.createElement(React.Fragment, null, renderFromType(children, {}, null));
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
      children = props.children;
      props.elType;
      var disabled = props.disabled,
      LeftComponent = props.LeftComponent,
      close = props.close,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      RightComponent = props.RightComponent,
      styles = props.styles,
      SwitchComponent = props.SwitchComponent;
      props.setCheckedSetter;
      var type = props.type,
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
  return children && React.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, React.createElement(ChildrenComponent, {
    className: "keg-switch-container",
    children: children
  })) || React.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, LeftComponent && React.createElement(SideComponent, {
    className: "keg-switch-left",
    Component: LeftComponent,
    style: activeStyles.content.left
  }), SwitchComponent ? renderFromType(SwitchComponent, _objectSpread2(_objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React.createElement(KegSwitch, _extends({
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content
  }, getSwitchColors(thumbColor, trackColor, activeStyles.content), getChecked(false, isChecked), getOnChangeHandler(false, setCheckedValue(isChecked, setChecked, onChange || onValueChange)))), RightComponent && React.createElement(SideComponent, {
    className: "keg-switch-right",
    Component: RightComponent,
    style: activeStyles.content.right
  }));
});

var isWeb = getPlatform() === 'web';
var Text = KegText('link');
var Element = React.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href;
      props.onPress;
      var style = props.style,
      target = props.target,
      attrs = _objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React.createElement(Touchable, _extends({
    className: useClassList('keg-link', className)
  }, elProps, attrs, {
    touchRef: ref
  }), React.createElement(Text, {
    accessibilityRole: "link",
    className: "keg-link-text",
    style: style,
    href: href,
    target: target
  }, children));
});
var Link = function Link(props) {
  return React.createElement(LinkWrapper, _extends({}, props, {
    Element: Element,
    isWeb: isWeb
  }));
};

export { Link as A, CheckGroup, FilePicker, Form, Link, Option, Radio, Select, Slider, Switch, useKeyPress };
//# sourceMappingURL=index.js.map
