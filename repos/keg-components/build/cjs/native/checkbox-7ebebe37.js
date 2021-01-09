'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var useClassName_native = require('./useClassName.native-3d1a229b.js');
var view_native = require('./view.native-20f555a1.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var svgIcon = require('./svgIcon-21afc6ae.js');
var checkbox_wrapper = require('./checkbox.wrapper-d0165ea9.js');

var Check = function Check(props) {
  return React.createElement(svgIcon.SvgIcon, _rollupPluginBabelHelpers._extends({}, props, {
    viewBox: "0 0 512 512",
    delta: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
  }));
};

var Input = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName_native.useClassName('keg-input', className, ref);
  return React__default.createElement("input", _rollupPluginBabelHelpers._extends({
    ref: classRef
  }, props));
});

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
var Input$1 = styleInjector.StyleInjector(Input, {
  displayName: 'Checkbox',
  className: 'keg-checkbox'
});
var Element = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      elProps = props.elProps,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? jsutils.noPropObj : _props$styles,
      _props$CheckIcon = props.CheckIcon,
      CheckIcon = _props$CheckIcon === void 0 ? Check : _props$CheckIcon,
      checked = props.checked,
      attributes = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "elProps", "styles", "CheckIcon", "checked"]);
  var checkStyle = React.useMemo(function () {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, checkBoxStyles.icon), styles.indicator);
  }, [checkBoxStyles, styles]);
  var inputStyle = React.useMemo(function () {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, styles.input), checkBoxStyles.input);
  }, [checkBoxStyles, styles]);
  return React__default.createElement(view_native.View, {
    style: styles.main,
    className: className
  }, React__default.createElement(view_native.View, {
    className: "keg-checkbox-area",
    style: styles.area
  }), checked && React__default.createElement(CheckIcon, {
    className: "keg-checkbox-icon",
    style: checkStyle
  }), React__default.createElement(Input$1, _rollupPluginBabelHelpers._extends({
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
//# sourceMappingURL=checkbox-7ebebe37.js.map
