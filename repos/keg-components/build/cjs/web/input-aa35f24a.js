'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
var getInputValue = require('./getInputValue.js');
var getReadOnly = require('./getReadOnly.js');
require('react-native');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var useInputHandlers = require('./useInputHandlers.js');
var usePressHandlers = require('./usePressHandlers.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var input = require('./input-224b7e15.js');

var KegInput = styleInjector.StyleInjector(input.Input, {
  displayName: 'Input',
  className: 'keg-input'
});
var getValue = function getValue(_ref) {
  var children = _ref.children,
      value = _ref.value;
  var setValue = getInputValue.getValueFromChildren(value, children);
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
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "children", "disabled", "editable", "Element", "onChange", "onValueChange", "onChangeText", "onClick", "onPress", "readOnly", "type", "themePath", "style", "value"]);
  var inputStyles = useThemePath.useThemePath(themePath);
  return React__default.createElement(KegInput, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "textbox",
    onPress: onPress
  }, getReadOnly.getReadOnly(false, readOnly, disabled, editable), getValue(props), useInputHandlers.useInputHandlers({
    onChange: onChange,
    onValueChange: onValueChange,
    onChangeText: onChangeText
  }), usePressHandlers.usePressHandlers(false, {
    onClick: onClick,
    onPress: onPress
  }), elProps, {
    style: [inputStyles, style],
    ref: ref
  }));
});

exports.Input = Input;
//# sourceMappingURL=input-aa35f24a.js.map
