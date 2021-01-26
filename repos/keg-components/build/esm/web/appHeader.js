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
import './useClassName-6851fdf6.js';
import './view.native-5aeb3e53.js';
import '@keg-hub/re-theme/styleInjector';
import './view-a64440c5.js';
import './useTextAccessibility.js';
import './kegText.native-7cc07481.js';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-653699c8.js';
import './text.js';
import './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList-eea8a571.js';
import './useThemeTypeAsClass-cd54e95a.js';
import './icon-0e3838cf.js';
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
