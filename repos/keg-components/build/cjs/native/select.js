'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
require('./isValidComponent.js');
require('./renderFromType.js');
var getInputValue = require('./getInputValue.js');
require('./validateFunctions.js');
require('react-native');
var useClassName_native = require('./useClassName.native-3d1a229b.js');
var view_native = require('./view.native-20f555a1.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/re-theme');
var useSelectHandlers = require('./useSelectHandlers.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList.native-9e7810c9.js');
var useThemeTypeAsClass_native = require('./useThemeTypeAsClass.native-90f04031.js');
var icon = require('./icon-3cb30f41.js');
require('react-native-svg');
require('./svgIcon-21afc6ae.js');
var select = require('./select-76ea5ad7.js');

var KegSelect = styleInjector.StyleInjector(select.Select, {
  displayName: 'Select',
  className: 'keg-select'
});
var getValue = function getValue(props) {
  var children = props.children,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      readOnly = props.readOnly,
      value = props.value;
  var setValue = getInputValue.getValueFromChildren(value, children);
  var valKey = getInputValue.getInputValueKey(false, onChange, onValueChange, readOnly);
  return _rollupPluginBabelHelpers._defineProperty({}, valKey, setValue);
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
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "children", "disabled", "readOnly", "onChange", "onValueChange", "style", "styles", "type", "themePath", "value"]);
  var selectStyles = useThemePath.useThemePath(themePath, styles);
  var selectClasses = useThemeTypeAsClass_native.useThemeTypeAsClass();
  var classRef = useClassName_native.useClassName('keg-select', selectClasses, ref);
  return React__default.createElement(view_native.View, {
    style: [selectStyles.main, style]
  }, React__default.createElement(KegSelect, _rollupPluginBabelHelpers._extends({
    ref: classRef
  }, elProps, {
    enabled: !disabled,
    style: [selectStyles.select]
  }, getValue(props), useSelectHandlers.useSelectHandlers({
    onChange: onChange,
    onValueChange: onValueChange
  })), children), React__default.createElement(icon.Icon, {
    styles: selectStyles.icon,
    Component: select.ChevronDown,
    color: disabled && ((_selectStyles$icon = selectStyles.icon) === null || _selectStyles$icon === void 0 ? void 0 : (_selectStyles$icon$di = _selectStyles$icon.disabled) === null || _selectStyles$icon$di === void 0 ? void 0 : _selectStyles$icon$di.color)
  }));
});

exports.Select = Select;
//# sourceMappingURL=select.js.map
