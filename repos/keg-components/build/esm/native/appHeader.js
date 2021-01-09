import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import React__default from 'react';
import './isValidComponent.js';
import './renderFromType.js';
import './getPressHandler.js';
import './getActiveOpacity.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './view.native-54e7e7ef.js';
import './useTextAccessibility.js';
import './kegText.js';
import '@keg-hub/re-theme/styleInjector';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-ef69c4aa.js';
import './text.js';
import './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import './useThemeTypeAsClass.native-a05b9a50.js';
import './icon-2cf7eaa6.js';
import './touchable.js';
import './touchable-e78a3026.js';
import './button.js';
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
import { ItemHeader } from './itemHeader.js';

var AppHeader = function AppHeader(props) {
  var className = props.className,
      otherProps = _objectWithoutProperties(props, ["className"]);
  return React__default.createElement(ItemHeader, _extends({
    accessibilityRole: "banner",
    className: useClassList(),
    appHeader: true
  }, otherProps));
};

export { AppHeader };
//# sourceMappingURL=appHeader.js.map
