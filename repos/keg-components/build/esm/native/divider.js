import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { useStyle } from '@keg-hub/re-theme';
import { V as View } from './view.native-f7a27d15.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import { useAccessibilityRole } from './useAccessibilityRole.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import './useThemeWithHeight.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './getPlatform-e625f46a.js';
import './useThemePath.js';

var _excluded = ["className", "style"];
var Divider = React__default.forwardRef(function (_ref, ref) {
  _ref.className;
      var style = _ref.style,
      props = _objectWithoutProperties(_ref, _excluded);
  var dividerStyle = useStyle('divider');
  var accessibilityRoleObj = useAccessibilityRole('separator');
  return React__default.createElement(View, _extends({
    ref: ref,
    className: useClassList()
  }, props, {
    style: [dividerStyle, style]
  }, accessibilityRoleObj));
});

export { Divider };
//# sourceMappingURL=divider.js.map
