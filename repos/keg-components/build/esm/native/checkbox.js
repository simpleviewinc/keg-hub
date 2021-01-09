import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import React__default from 'react';
import './isValidComponent.js';
import './renderFromType.js';
import './getOnChangeHandler.js';
import './getChecked.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './view.native-54e7e7ef.js';
import './useTextAccessibility.js';
import './kegText.js';
import '@keg-hub/re-theme/styleInjector';
import { withTheme } from '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-ef69c4aa.js';
import { Text } from './text.js';
import './useThemePath.js';
import './useThemeWithHeight.js';
import './useClassList.native-70068878.js';
import './useThemeTypeAsClass.native-a05b9a50.js';
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
import { C as CheckboxWrapper } from './checkbox.wrapper-2b4c20ad.js';

var Element = withTheme(function (props) {
  var theme = props.theme,
      style = props.style,
      wrapper = props.wrapper,
      children = props.children,
      onClick = props.onClick,
      onPress = props.onPress,
      text = props.text,
      args = _objectWithoutProperties(props, ["theme", "style", "wrapper", "children", "onClick", "onPress", "text"]);
  return React__default.createElement(Text, _extends({}, args, {
    style: {}
  }), text);
});
var Checkbox = function Checkbox(props) {
  return React__default.createElement(CheckboxWrapper, _extends({}, props, {
    elType: 'checkbox',
    Element: Element,
    isWeb: true
  }));
};

export { Checkbox };
//# sourceMappingURL=checkbox.js.map
