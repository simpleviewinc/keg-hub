import { d as _objectWithoutProperties, _ as _objectSpread2, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import { V as View } from './view-2274aefb.js';
import { C as CheckboxWrapper, a as Check } from './checkbox.wrapper-8d69b5ad.js';
import React, { useMemo, forwardRef } from 'react';
import { noPropObj } from '@keg-hub/jsutils';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { I as Input$1 } from './input.web-14b4a9e4.js';
import './view.native-a7f08b5b.js';
import 'react-native';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './svgIcon-ac9e14ca.js';
import 'prop-types';
import './svgIcon.native-9be49668.js';
import 'react-native-svg';
import '@keg-hub/re-theme';
import './caption.js';
import './kegText-5c4aeb4b.js';
import './kegText.native-be460636.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import './h1.js';
import './h2.js';
import './h3.js';
import './h4.js';
import './h5.js';
import './h6.js';
import './label.js';
import './p.js';
import './subtitle.js';
import './text.js';
import './renderFromType.js';
import './isValidComponent.js';
import './getOnChangeHandler.js';
import './getChecked.js';
import '@keg-hub/re-theme/colors';
import './useThemePath.js';
import './useThemeWithHeight.js';
import './useClassList-1d418045.js';
import './useThemeTypeAsClass-fec5ff6f.js';
import './colors-6402d3b3.js';

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
var Element = React.forwardRef(function (props, ref) {
  var className = props.className,
      elProps = props.elProps,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? noPropObj : _props$styles,
      _props$CheckIcon = props.CheckIcon,
      CheckIcon = _props$CheckIcon === void 0 ? Check : _props$CheckIcon,
      checked = props.checked,
      attributes = _objectWithoutProperties(props, ["className", "elProps", "styles", "CheckIcon", "checked"]);
  var checkStyle = useMemo(function () {
    return _objectSpread2(_objectSpread2({}, checkBoxStyles.icon), styles.indicator);
  }, [checkBoxStyles, styles]);
  var inputStyle = useMemo(function () {
    return _objectSpread2(_objectSpread2({}, styles.input), checkBoxStyles.input);
  }, [checkBoxStyles, styles]);
  return React.createElement(View, {
    style: styles.main,
    className: className
  }, React.createElement(View, {
    className: "keg-checkbox-area",
    style: styles.area
  }), checked && React.createElement(CheckIcon, {
    className: "keg-checkbox-icon",
    style: checkStyle
  }), React.createElement(Input, _extends({
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
  return React.createElement(CheckboxWrapper, _extends({}, props, {
    elType: 'checkbox',
    Element: Element,
    isWeb: true,
    ref: ref
  }));
});
Checkbox.propTypes = _objectSpread2({}, CheckboxWrapper.propTypes);

export { Checkbox };
//# sourceMappingURL=checkbox.js.map
