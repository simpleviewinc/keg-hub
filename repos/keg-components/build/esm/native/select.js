import { d as _objectWithoutProperties, e as _extends, a as _defineProperty } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import React__default from 'react';
import './isValidComponent.js';
import './renderFromType.js';
import { getValueFromChildren, getInputValueKey } from './getInputValue.js';
import './validateFunctions.js';
import 'react-native';
import { u as useClassName } from './useClassName.native-32e8827d.js';
import { V as View } from './view.native-54e7e7ef.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import '@keg-hub/re-theme';
import { useSelectHandlers } from './useSelectHandlers.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import './useClassList.native-70068878.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass.native-a05b9a50.js';
import { I as Icon } from './icon-2cf7eaa6.js';
import 'react-native-svg';
import './svgIcon-8c133388.js';
import { S as Select$1, C as ChevronDown } from './select-31dcb40f.js';

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
  var selectClasses = useThemeTypeAsClass();
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

export { Select };
//# sourceMappingURL=select.js.map
