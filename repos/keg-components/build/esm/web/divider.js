import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import React__default from 'react';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-477fb4c5.js';
import './view.native-3802ec98.js';
import '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-45334891.js';
import { useTheme } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList-4be992cd.js';

var Divider = function Divider(_ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "style"]);
  var theme = useTheme();
  return React__default.createElement(View, _extends({
    accessibilityRole: "separator",
    className: useClassList('keg-divider', className)
  }, props, {
    style: [get(theme, ['divider']), style]
  }));
};

export { Divider };
//# sourceMappingURL=divider.js.map
