import { d as _objectWithoutProperties, e as _extends, a as _defineProperty } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { V as View } from './view-2274aefb.js';
import { S as Select$1, C as ChevronDown } from './select-2bbcc7c9.js';
import '@keg-hub/jsutils';
import { getValueFromChildren, getInputValueKey } from './getInputValue.js';
import '@keg-hub/re-theme/colors';
import { useSelectHandlers } from './useSelectHandlers.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { u as useClassName } from './useClassName-682bc33b.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass-fec5ff6f.js';
import 'react-native-svg';
import '@keg-hub/re-theme';
import { I as Icon } from './icon-f1144e8a.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import './view.native-a7f08b5b.js';
import './svgIcon-51ab090d.js';
import './validateFunctions.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './colors-6402d3b3.js';
import './useClassList-1d418045.js';
import './renderFromType.js';
import './isValidComponent.js';

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

export { Select };
//# sourceMappingURL=select.js.map
