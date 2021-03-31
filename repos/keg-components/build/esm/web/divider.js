import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { useStyle } from '@keg-hub/re-theme';
import { V as View } from './view-2274aefb.js';
import { u as useClassList } from './useClassList-1d418045.js';
import { useAccessibilityRole } from './useAccessibilityRole.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import './useThemeWithHeight.js';
import 'react-native';
import './view.native-a7f08b5b.js';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './getPlatform-95568099.js';
import './useThemePath.js';

var Divider = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "style"]);
  var dividerStyle = useStyle('divider');
  var accessibilityRoleObj = useAccessibilityRole('separator');
  return React.createElement(View, _extends({
    ref: ref,
    className: useClassList('keg-divider', className)
  }, props, {
    style: [dividerStyle, style]
  }, accessibilityRoleObj));
});

export { Divider };
//# sourceMappingURL=divider.js.map
