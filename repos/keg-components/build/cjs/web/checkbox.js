'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('./colors-3022218c.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./isValidComponent.js');
require('./renderFromType.js');
require('./getOnChangeHandler.js');
require('./ensureClassArray.js');
require('./getChecked.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-6b6da47b.js');
require('./view.native-e2bb0f89.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var view = require('./view-ea13da55.js');
require('./useTextAccessibility.js');
require('./kegText.native-dfad83ae.js');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-b42d09ba.js');
require('./text.js');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList-9eaefcd6.js');
require('./useThemeTypeAsClass-103ed294.js');
require('react-native-svg');
require('./svgIcon-21afc6ae.js');
var checkbox_wrapper = require('./checkbox.wrapper-cfffd2dd.js');
require('./caption.js');
require('./h1.js');
require('./h2.js');
require('./h3.js');
require('./h4.js');
require('./h5.js');
require('./h6.js');
require('./label.js');
require('./p.js');
require('./subtitle.js');
var input_web = require('./input.web-859d0b21.js');

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
var Element = React__default.forwardRef(function (props, ref) {
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
  return React__default.createElement(view.View, {
    style: styles.main,
    className: className
  }, React__default.createElement(view.View, {
    className: "keg-checkbox-area",
    style: styles.area
  }), checked && React__default.createElement(CheckIcon, {
    className: "keg-checkbox-icon",
    style: checkStyle
  }), React__default.createElement(Input, _rollupPluginBabelHelpers._extends({
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
  return React__default.createElement(checkbox_wrapper.CheckboxWrapper, _rollupPluginBabelHelpers._extends({}, props, {
    elType: 'checkbox',
    Element: Element,
    isWeb: true,
    ref: ref
  }));
});
Checkbox.propTypes = _rollupPluginBabelHelpers._objectSpread2({}, checkbox_wrapper.CheckboxWrapper.propTypes);

exports.Checkbox = Checkbox;
//# sourceMappingURL=checkbox.js.map
