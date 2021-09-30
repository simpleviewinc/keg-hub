'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var view = require('./view-3fcb25db.js');
var checkbox_wrapper = require('./checkbox.wrapper-f7b31de8.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var input_web = require('./input.web-369be1b2.js');
require('./view.native-895f9104.js');
require('react-native-web');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./svgIcon-bb2d3711.js');
require('./svgIcon.native-d0de8203.js');
require('react-native-svg-web');
require('@keg-hub/re-theme');
require('./caption.js');
require('./kegText-b0f1b442.js');
require('./kegText.native-100193df.js');
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
require('./useThemeTypeAsClass-9fb8a8ab.js');
require('./colors-da502c66.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "elProps", "styles", "CheckIcon", "checked"];
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
      attributes = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
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
