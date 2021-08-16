import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { ItemHeader } from './itemHeader.js';
import { u as useClassList } from './useClassList-1d418045.js';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';
import './view-9c41ec1e.js';
import './view.native-2491eb60.js';
import 'react-native-web';
import './useClassName-ed83df40.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './button.js';
import './touchable.js';
import './text.js';
import './kegText-9f80996b.js';
import './kegText.native-6bbad9e4.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import './renderFromType.js';
import './isValidComponent.js';
import './getPressHandler.js';
import './getActiveOpacity.js';
import '@keg-hub/re-theme/colors';
import './useThemePath.js';
import './useThemeWithHeight.js';
import './useThemeTypeAsClass-fb17085e.js';
import './colors-6402d3b3.js';
import './icon-ad5d7324.js';
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
import './getPlatform-95568099.js';
import './useAccessibilityRole.js';

var _excluded = ["className"];
var AppHeader = function AppHeader(props) {
  var className = props.className,
      otherProps = _objectWithoutProperties(props, _excluded);
  return React__default.createElement(ItemHeader, _extends({
    accessibilityRole: "banner",
    className: useClassList('keg-app-header', className),
    appHeader: true
  }, otherProps));
};

export { AppHeader };
//# sourceMappingURL=appHeader.js.map
