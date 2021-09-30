'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var view = require('./view-3fcb25db.js');
var select = require('./select-e19ffaa7.js');
require('@keg-hub/jsutils');
var getInputValue = require('./getInputValue.js');
require('@keg-hub/re-theme/colors');
var useSelectHandlers = require('./useSelectHandlers.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native-web');
var useClassName = require('./useClassName-eec4a5f1.js');
var useThemeTypeAsClass = require('./useThemeTypeAsClass-9fb8a8ab.js');
require('./svgIcon-bb2d3711.js');
var icon = require('./icon-c7ba25ca.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('./view.native-895f9104.js');
require('./validateFunctions.js');
require('@keg-hub/re-theme');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./colors-da502c66.js');
require('./useClassList-89a8dbd4.js');
require('./svgIcon.native-d0de8203.js');
require('react-native-svg-web');
require('./renderFromType.js');
require('./isValidComponent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "children", "disabled", "readOnly", "onChange", "onValueChange", "style", "styles", "type", "themePath", "value"];
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
var Select = React__default['default'].forwardRef(function (props, ref) {
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
      var elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  var selectStyles = useThemePath.useThemePath(themePath, styles);
  var selectClasses = useThemeTypeAsClass.useThemeTypeAsClass(themePath || type, 'keg-select', className);
  var classRef = useClassName.useClassName('keg-select', selectClasses, ref);
  return React__default['default'].createElement(view.View, {
    style: [selectStyles.main, style]
  }, React__default['default'].createElement(KegSelect, _rollupPluginBabelHelpers._extends({
    ref: classRef
  }, elProps, {
    enabled: !disabled,
    style: [selectStyles.select]
  }, getValue(props), useSelectHandlers.useSelectHandlers({
    onChange: onChange,
    onValueChange: onValueChange
  })), children), React__default['default'].createElement(icon.Icon, {
    styles: selectStyles.icon,
    Component: select.ChevronDown,
    color: disabled && ((_selectStyles$icon = selectStyles.icon) === null || _selectStyles$icon === void 0 ? void 0 : (_selectStyles$icon$di = _selectStyles$icon.disabled) === null || _selectStyles$icon$di === void 0 ? void 0 : _selectStyles$icon$di.color)
  }));
});

exports.Select = Select;
//# sourceMappingURL=select.js.map
