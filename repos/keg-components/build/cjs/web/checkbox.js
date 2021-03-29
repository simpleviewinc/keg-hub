'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var view = require('./view-276572bd.js');
var checkbox_wrapper = require('./checkbox.wrapper-b8cbc4f5.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var input_web = require('./input.web-adf7ad46.js');
require('./view.native-99366b4b.js');
require('react-native');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./svgIcon-ce94c39f.js');
require('react-native-svg');
require('@keg-hub/re-theme');
require('./caption.js');
require('./kegText-f2cfdfd4.js');
require('./kegText.native-1994a0b7.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('./h1.js');
require('./h2.js');
require('./h3.js');
require('./h4.js');
require('./h5.js');
require('./h6.js');
require('./label.js');
require('./p.js');
require('./subtitle.js');
require('./text.js');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./getOnChangeHandler.js');
require('./getChecked.js');
require('@keg-hub/re-theme/colors');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList-89a8dbd4.js');
require('./useThemeTypeAsClass-a9284938.js');
require('./colors-da502c66.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var checkBoxStyles = {
  icon: {
    position: 'relative',
    zIndex: 1,
    height: 14,
    width: 14,
    top: 0,
    left: 3,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    margin: 0,
    opacity: 0,
    cursor: 'pointer'
  }
};
var Input = styleInjector.StyleInjector(input_web.Input, {
  displayName: 'Checkbox',
  className: 'keg-checkbox'
});
var Element = React__default['default'].forwardRef(function (props, ref) {
  var className = props.className,
      elProps = props.elProps,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? jsutils.noPropObj : _props$styles,
      _props$CheckIcon = props.CheckIcon,
      CheckIcon = _props$CheckIcon === void 0 ? checkbox_wrapper.Check : _props$CheckIcon,
      checked = props.checked,
      attributes = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "elProps", "styles", "CheckIcon", "checked"]);
  var checkStyle = React.useMemo(function () {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, checkBoxStyles.icon), styles.indicator);
  }, [checkBoxStyles, styles]);
  var inputStyle = React.useMemo(function () {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, styles.input), checkBoxStyles.input);
  }, [checkBoxStyles, styles]);
  return React__default['default'].createElement(view.View, {
    style: styles.main,
    className: className
  }, React__default['default'].createElement(view.View, {
    className: "keg-checkbox-area",
    style: styles.area
  }), checked && React__default['default'].createElement(CheckIcon, {
    className: "keg-checkbox-icon",
    style: checkStyle
  }), React__default['default'].createElement(Input, _rollupPluginBabelHelpers._extends({
    className: "keg-checkbox"
  }, elProps, attributes, {
    role: "checkbox",
    checked: checked,
    type: "checkbox",
    ref: ref,
    style: inputStyle
  })));
});
var Checkbox = React.forwardRef(function (props, ref) {
  return React__default['default'].createElement(checkbox_wrapper.CheckboxWrapper, _rollupPluginBabelHelpers._extends({}, props, {
    elType: 'checkbox',
    Element: Element,
    isWeb: true,
    ref: ref
  }));
});
Checkbox.propTypes = _rollupPluginBabelHelpers._objectSpread2({}, checkbox_wrapper.CheckboxWrapper.propTypes);

exports.Checkbox = Checkbox;
//# sourceMappingURL=checkbox.js.map
