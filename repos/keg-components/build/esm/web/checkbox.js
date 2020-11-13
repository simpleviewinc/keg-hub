import { d as _objectWithoutProperties, _ as _objectSpread2, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { noPropObj } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './colors-3366b3e1.js';
import '@keg-hub/re-theme/colors';
import './buildColorStyles.js';
import './platformFlatten-4856c5dd.js';
import './buildTheme.js';
import React__default, { useMemo, forwardRef } from 'react';
import './isValidComponent.js';
import './renderFromType.js';
import './getOnChangeHandler.js';
import './ensureClassArray.js';
import './getChecked.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-477fb4c5.js';
import './view.native-3802ec98.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-45334891.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText.native-67183179.js';
import './kegText-a280e501.js';
import './text.js';
import './useThemePath.js';
import './useThemeWithHeight.js';
import './useClassList-4be992cd.js';
import './useThemeTypeAsClass-56c26a32.js';
import 'react-native-svg';
import './svgIcon-8c133388.js';
import { C as CheckboxWrapper, a as Check } from './checkbox.wrapper-145d653b.js';
import './caption.js';
import './h1.js';
import './h2.js';
import './h3.js';
import './h4.js';
import './h5.js';
import './h6.js';
import './label.js';
import './p.js';
import './subtitle.js';
import { I as Input$1 } from './input.web-00da1b52.js';

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
      attributes = _objectWithoutProperties(props, ["className", "elProps", "styles", "CheckIcon", "checked"]);
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

export { Checkbox };
//# sourceMappingURL=checkbox.js.map
