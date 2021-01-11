import { d as _objectWithoutProperties, b as _slicedToArray, _ as _objectSpread2, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { toBool, checkCall, get, isStr } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import React__default, { forwardRef, useState, useCallback, useImperativeHandle, useMemo } from 'react';
import { renderFromType } from './renderFromType.js';
import { getOnChangeHandler } from './getOnChangeHandler.js';
import { getChecked } from './getChecked.js';
import 'react-native';
import { V as View } from './view.native-54e7e7ef.js';
import { Text } from './text.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass.native-a05b9a50.js';
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

var useCheckedState = function useCheckedState(isChecked, themeStyles) {
  return useMemo(function () {
    return _objectSpread2(_objectSpread2({}, themeStyles), {}, {
      content: _objectSpread2(_objectSpread2({}, themeStyles.content), {}, {
        area: _objectSpread2(_objectSpread2({}, get(themeStyles, 'content.area.off')), isChecked && get(themeStyles, 'content.area.on')),
        indicator: _objectSpread2(_objectSpread2({}, get(themeStyles, 'content.indicator.off')), isChecked && get(themeStyles, 'content.indicator.on'))
      })
    });
  }, [isChecked, themeStyles]);
};
var useCheckboxPressHandler = function useCheckboxPressHandler(isChecked, setChecked, onChange, _ref) {
  var _ref$disableCheck = _ref.disableCheck,
      disableCheck = _ref$disableCheck === void 0 ? false : _ref$disableCheck,
      _ref$disableUncheck = _ref.disableUncheck,
      disableUncheck = _ref$disableUncheck === void 0 ? true : _ref$disableUncheck;
  return useCallback(function (event) {
    if (isChecked) !disableUncheck && setChecked(false);else !disableCheck && setChecked(true);
    checkCall(onChange, event, !isChecked);
  }, [isChecked, setChecked, onChange, disableCheck, disableUncheck]);
};
var SideComponent = function SideComponent(_ref2) {
  var className = _ref2.className,
      Component = _ref2.Component,
      styles = _ref2.styles,
      style = _ref2.style,
      onPress = _ref2.onPress;
  var sideProps = onPress ? {
    onPress: onPress
  } : undefined;
  return isStr(Component) ? React__default.createElement(Text, _extends({
    className: className,
    style: style
  }, sideProps), Component) : renderFromType(Component, _objectSpread2({
    className: className,
    style: style,
    styles: styles
  }, sideProps));
};
var ChildrenComponent = function ChildrenComponent(_ref3) {
  var children = _ref3.children,
      className = _ref3.className;
  return React__default.createElement(React__default.Fragment, null, renderFromType(children, {
    className: className
  }, null));
};
var useCheckboxHandle = function useCheckboxHandle(ref, isChecked, _setChecked, pressHandler) {
  return useImperativeHandle(ref, function () {
    return {
      isChecked: isChecked,
      setChecked: function setChecked(checked) {
        _setChecked(checked);
        pressHandler({}, checked);
      }
    };
  }, [ref, isChecked, _setChecked, pressHandler]);
};
var CheckboxWrapper = forwardRef(function (props, ref) {
  var className = props.className,
      initChecked = props.initChecked,
      checked = props.checked,
      children = props.children,
      elType = props.elType,
      Element = props.Element,
      CheckIcon = props.CheckIcon,
      disabled = props.disabled,
      _props$disableCheck = props.disableCheck,
      disableCheck = _props$disableCheck === void 0 ? false : _props$disableCheck,
      _props$disableUncheck = props.disableUncheck,
      disableUncheck = _props$disableUncheck === void 0 ? false : _props$disableUncheck,
      _props$allowAdjacentP = props.allowAdjacentPress,
      allowAdjacentPress = _props$allowAdjacentP === void 0 ? true : _props$allowAdjacentP,
      isWeb = props.isWeb,
      LeftComponent = props.LeftComponent,
      leftClassName = props.leftClassName,
      close = props.close,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      RightComponent = props.RightComponent,
      rightClassName = props.rightClassName,
      styles = props.styles,
      CheckboxComponent = props.CheckboxComponent,
      type = props.type,
      themePath = props.themePath,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["className", "initChecked", "checked", "children", "elType", "Element", "CheckIcon", "disabled", "disableCheck", "disableUncheck", "allowAdjacentPress", "isWeb", "LeftComponent", "leftClassName", "close", "onChange", "onValueChange", "RightComponent", "rightClassName", "styles", "CheckboxComponent", "type", "themePath", "value"]);
  var initCheckedValue = toBool(checked || initChecked || value);
  var _useState = useState(initCheckedValue),
      _useState2 = _slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setChecked = _useState2[1];
  var pressHandler = useCheckboxPressHandler(isChecked, setChecked, onChange || onValueChange,
  {
    disableCheck: disableCheck,
    disableUncheck: disableUncheck
  });
  useCheckboxHandle(ref, isChecked, setChecked, onChange || onValueChange);
  var canUseHandler = !disabled && (isChecked && !disableUncheck || !isChecked && !disableCheck);
  var elThemePath = themePath || "form.".concat(elType, ".").concat(close && 'close' || 'default');
  var themeStyles = useThemePath(elThemePath, styles);
  var disabledStyles = useThemePath("form.".concat(elType, ".disabled"), themeStyles);
  var activeStyles = useCheckedState(isChecked, canUseHandler ? themeStyles : disabledStyles);
  var typeClassName = useThemeTypeAsClass();
  var pressHandlerProp = canUseHandler ? getOnChangeHandler(isWeb, pressHandler) : undefined;
  var ChildrenView = children && React__default.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, React__default.createElement(ChildrenComponent, {
    className: "keg-checkbox-container",
    children: children
  }));
  return ChildrenView || React__default.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, LeftComponent && React__default.createElement(SideComponent, {
    className: useClassList(),
    Component: LeftComponent,
    style: activeStyles.content.left,
    onPress: allowAdjacentPress && canUseHandler && pressHandler
  }), CheckboxComponent ? renderFromType(CheckboxComponent, _objectSpread2(_objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React__default.createElement(Element, _extends({
    className: "keg-checkbox-container",
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content,
    CheckIcon: CheckIcon
  }, getChecked(isWeb, isChecked), pressHandlerProp)), RightComponent && React__default.createElement(SideComponent, {
    className: useClassList(),
    Component: RightComponent,
    style: activeStyles.content.right,
    onPress: allowAdjacentPress && canUseHandler && pressHandler
  }));
});

export { CheckboxWrapper as C };
//# sourceMappingURL=checkbox.wrapper-2b4c20ad.js.map
