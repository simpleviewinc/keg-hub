import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import './colors-13c6a916.js';
import './getPlatform-95568099.js';
import React__default from 'react';
import './isValidComponent.js';
import './renderFromType.js';
import './getPressHandler.js';
import './ensureClassArray.js';
import './getActiveOpacity.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-477fb4c5.js';
import './view.native-3802ec98.js';
import '@keg-hub/re-theme/styleInjector';
import './view-45334891.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText.native-67183179.js';
import './kegText-a280e501.js';
import './text.js';
import './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList-4be992cd.js';
import './useThemeTypeAsClass-2304ec6a.js';
import './icon-e1b4d035.js';
import './touchable.js';
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
    className: useClassList('keg-app-header', className),
    appHeader: true
  }, otherProps));
};

export { AppHeader };
//# sourceMappingURL=appHeader.js.map
