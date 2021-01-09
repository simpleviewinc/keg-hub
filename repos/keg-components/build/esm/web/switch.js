import { d as _objectWithoutProperties, b as _slicedToArray, _ as _objectSpread2, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { toBool, get, isStr, checkCall } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import './colors-13c6a916.js';
import React__default, { forwardRef, useState, useImperativeHandle, useMemo } from 'react';
import './isValidComponent.js';
import { renderFromType } from './renderFromType.js';
import { getOnChangeHandler } from './getOnChangeHandler.js';
import './ensureClassArray.js';
import { getChecked } from './getChecked.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-a3859346.js';
import './view.native-117494a9.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-216fa8c1.js';
import './useTextAccessibility.js';
import './kegText.native-231e3dc9.js';
import { useTheme } from '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-fd522d17.js';
import { Text } from './text.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import './useClassList-eea8a571.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass-cd54e95a.js';
import './caption.js';
import './h1.js';
import './h2.js';
import './h3.js';
import './h4.js';
import './h5.js';
import './h6.js';
import './label.js';
import './p.js';
import './subtitle.js';
import { S as Switch$1 } from './switch-babdd77a.js';

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
  return isStr(Component) ? React__default.createElement(Text, {
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

export { Switch };
//# sourceMappingURL=switch.js.map
