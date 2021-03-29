import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { withTheme } from '@keg-hub/re-theme';
import { Text } from './text.js';
import { C as CheckboxWrapper } from './checkbox.wrapper-1850b63a.js';
import './kegText-f9567f63.js';
import '@keg-hub/jsutils';
import './kegText.js';
import './useClassName.native-32e8827d.js';
import 'react-native';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import './view.native-b0b1ddd4.js';
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
import './renderFromType.js';
import './isValidComponent.js';
import './getOnChangeHandler.js';
import './getChecked.js';
import '@keg-hub/re-theme/colors';
import './useThemePath.js';
import './useThemeWithHeight.js';
import './useClassList.native-70068878.js';
import './useThemeTypeAsClass.native-a05b9a50.js';

var Element = withTheme(function (props) {
  props.theme;
      props.style;
      props.wrapper;
      props.children;
      props.onClick;
      props.onPress;
      var text = props.text,
      args = _objectWithoutProperties(props, ["theme", "style", "wrapper", "children", "onClick", "onPress", "text"]);
  return React.createElement(Text, _extends({}, args, {
    style: {}
  }), text);
});
var Checkbox = function Checkbox(props) {
  return React.createElement(CheckboxWrapper, _extends({}, props, {
    elType: 'checkbox',
    Element: Element,
    isWeb: true
  }));
};

export { Checkbox };
//# sourceMappingURL=checkbox.js.map
