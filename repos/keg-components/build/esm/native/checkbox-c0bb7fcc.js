import { e as _extends, d as _objectWithoutProperties, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b49fe34a.js';
import { V as View } from './view.native-f7a27d15.js';
import * as React from 'react';
import React__default, { useMemo, forwardRef } from 'react';
import { S as SvgIcon } from './svgIcon.native-4f87bca3.js';
import { C as CheckboxWrapper } from './checkbox.wrapper-a606288b.js';
import { noPropObj } from '@keg-hub/jsutils';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { u as useClassName } from './useClassName.native-32e8827d.js';

var Check = function Check(props) {
  return React.createElement(SvgIcon, _extends({}, props, {
    viewBox: "0 0 512 512",
    delta: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
  }));
};

var _excluded$1 = ["className"];
var Input$1 = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, _excluded$1);
  var classRef = useClassName('keg-input', className, ref);
  return React__default.createElement("input", _extends({
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
var Input = StyleInjector(Input$1, {
  displayName: 'Checkbox',
  className: 'keg-checkbox'
});
var Element = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      elProps = props.elProps,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? noPropObj : _props$styles,
      _props$CheckIcon = props.CheckIcon,
      CheckIcon = _props$CheckIcon === void 0 ? Check : _props$CheckIcon,
      checked = props.checked,
      attributes = _objectWithoutProperties(props, _excluded);
  var checkStyle = useMemo(function () {
    return _objectSpread2(_objectSpread2({}, checkBoxStyles.icon), styles.indicator);
  }, [checkBoxStyles, styles]);
  var inputStyle = useMemo(function () {
    return _objectSpread2(_objectSpread2({}, styles.input), checkBoxStyles.input);
  }, [checkBoxStyles, styles]);
  return React__default.createElement(View, {
    style: styles.main,
    className: className
  }, React__default.createElement(View, {
    className: "keg-checkbox-area",
    style: styles.area
  }), checked && React__default.createElement(CheckIcon, {
    className: "keg-checkbox-icon",
    style: checkStyle
  }), React__default.createElement(Input, _extends({
    className: "keg-checkbox"
  }, elProps, attributes, {
    role: "checkbox",
    checked: checked,
    type: "checkbox",
    ref: ref,
    style: inputStyle
  })));
});
var Checkbox = forwardRef(function (props, ref) {
  return React__default.createElement(CheckboxWrapper, _extends({}, props, {
    elType: 'checkbox',
    Element: Element,
    isWeb: true,
    ref: ref
  }));
});
Checkbox.propTypes = _objectSpread2({}, CheckboxWrapper.propTypes);

export { Checkbox as C };
//# sourceMappingURL=checkbox-c0bb7fcc.js.map
