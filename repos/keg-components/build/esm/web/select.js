import { d as _objectWithoutProperties, e as _extends, a as _defineProperty } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './colors-3366b3e1.js';
import '@keg-hub/re-theme/colors';
import './buildColorStyles.js';
import './platformFlatten-4856c5dd.js';
import './buildTheme.js';
import React__default from 'react';
import './isValidComponent.js';
import './renderFromType.js';
import './ensureClassArray.js';
import { getValueFromChildren, getInputValueKey } from './getInputValue.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import './validateFunctions.js';
import 'react-native';
import { u as useClassName } from './useClassName-477fb4c5.js';
import './view.native-3802ec98.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-45334891.js';
import '@keg-hub/re-theme';
import { useSelectHandlers } from './useSelectHandlers.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import './useClassList-4be992cd.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass-56c26a32.js';
import { I as Icon } from './icon-4977e155.js';
import 'react-native-svg';
import './svgIcon-8c133388.js';
import { S as Select$1, C as ChevronDown } from './select-e84bb2e6.js';

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

export { Select };
//# sourceMappingURL=select.js.map
