import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import React__default from 'react';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-6851fdf6.js';
import './view.native-5aeb3e53.js';
import '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-a64440c5.js';
import { useTheme } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList-eea8a571.js';

var Divider = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "style"]);
  var theme = useTheme();
  return React__default.createElement(View, _extends({
    ref: ref,
    accessibilityRole: "separator",
    className: useClassList('keg-divider', className)
  }, props, {
    style: [get(theme, ['divider']), style]
  }));
});

export { Divider };
//# sourceMappingURL=divider.js.map
