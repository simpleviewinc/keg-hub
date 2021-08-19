'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
require('@keg-hub/jsutils');
var getInputValue = require('./getInputValue.js');
var getReadOnly = require('./getReadOnly.js');
require('@keg-hub/re-theme/colors');
var useInputHandlers = require('./useInputHandlers.js');
var usePressHandlers = require('./usePressHandlers.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native-web');
var input = require('./input-9de20726.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "children", "disabled", "editable", "Element", "onChange", "onValueChange", "onChangeText", "onClick", "onPress", "readOnly", "type", "themePath", "style", "value"];
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
var Input = React__default['default'].forwardRef(function (props, ref) {
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
      var elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  var inputStyles = useThemePath.useThemePath(themePath);
  return React__default['default'].createElement(KegInput, _rollupPluginBabelHelpers._extends({
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
//# sourceMappingURL=input-e65999e6.js.map
