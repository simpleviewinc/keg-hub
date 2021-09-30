'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var view_native = require('./view.native-5d72f4dd.js');
var React = require('react');
var svgIcon_native = require('./svgIcon.native-1a38a3f7.js');
var checkbox_wrapper = require('./checkbox.wrapper-5a3b3816.js');
var jsutils = require('@keg-hub/jsutils');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var useClassName_native = require('./useClassName.native-3d1a229b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Check = function Check(props) {
  return React__namespace.createElement(svgIcon_native.SvgIcon, _rollupPluginBabelHelpers._extends({}, props, {
    viewBox: "0 0 512 512",
    delta: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
  }));
};

var _excluded$1 = ["className"];
var Input$1 = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded$1);
  var classRef = useClassName_native.useClassName('keg-input', className, ref);
  return React__default['default'].createElement("input", _rollupPluginBabelHelpers._extends({
    ref: classRef
  }, props));
});

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
var Input = styleInjector.StyleInjector(Input$1, {
  displayName: 'Checkbox',
  className: 'keg-checkbox'
});
var Element = React__default['default'].forwardRef(function (props, ref) {
  var className = props.className,
      elProps = props.elProps,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? jsutils.noPropObj : _props$styles,
      _props$CheckIcon = props.CheckIcon,
      CheckIcon = _props$CheckIcon === void 0 ? Check : _props$CheckIcon,
      checked = props.checked,
      attributes = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  var checkStyle = React.useMemo(function () {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, checkBoxStyles.icon), styles.indicator);
  }, [checkBoxStyles, styles]);
  var inputStyle = React.useMemo(function () {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, styles.input), checkBoxStyles.input);
  }, [checkBoxStyles, styles]);
  return React__default['default'].createElement(view_native.View, {
    style: styles.main,
    className: className
  }, React__default['default'].createElement(view_native.View, {
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
//# sourceMappingURL=checkbox-af9e9ec1.js.map
