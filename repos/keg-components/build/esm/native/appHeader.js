import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { ItemHeader } from './itemHeader.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';
import './view.native-f7a27d15.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './button.js';
import './touchable-ec804bf8.js';
import './touchable.js';
import '@keg-hub/re-theme/styleInjector';
import './text.js';
import './kegText-97d3d571.js';
import './kegText.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import './renderFromType.js';
import './isValidComponent.js';
import './getPressHandler.js';
import './getActiveOpacity.js';
import '@keg-hub/re-theme/colors';
import './useThemePath.js';
import './useThemeWithHeight.js';
import './useThemeTypeAsClass.native-a05b9a50.js';
import './icon-d03aaeac.js';
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
import './useAccessibilityRole.js';
import './getPlatform-e625f46a.js';

var _excluded = ["className"];
var AppHeader = function AppHeader(props) {
  props.className;
      var otherProps = _objectWithoutProperties(props, _excluded);
  return React__default.createElement(ItemHeader, _extends({
    accessibilityRole: "banner",
    className: useClassList(),
    appHeader: true
  }, otherProps));
};

export { AppHeader };
//# sourceMappingURL=appHeader.js.map
