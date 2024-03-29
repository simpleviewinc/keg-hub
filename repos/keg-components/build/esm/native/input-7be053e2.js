import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import '@keg-hub/jsutils';
import { getValueFromChildren } from './getInputValue.js';
import { getReadOnly } from './getReadOnly.js';
import '@keg-hub/re-theme/colors';
import { useInputHandlers } from './useInputHandlers.js';
import { usePressHandlers } from './usePressHandlers.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { I as Input$1 } from './input-48371ddf.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';

var _excluded = ["className", "children", "disabled", "editable", "Element", "onChange", "onValueChange", "onChangeText", "onClick", "onPress", "readOnly", "type", "themePath", "style", "value"];
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
  props.className;
      props.children;
      var _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$editable = props.editable,
      editable = _props$editable === void 0 ? true : _props$editable;
      props.Element;
      var onChange = props.onChange,
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
      style = props.style;
      props.value;
      var elProps = _objectWithoutProperties(props, _excluded);
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

export { Input as I };
//# sourceMappingURL=input-7be053e2.js.map
