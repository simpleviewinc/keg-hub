import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import React__default from 'react';
import 'react-native';
import './useClassName.native-32e8827d.js';
import { V as View } from './view.native-54e7e7ef.js';
import { useTheme } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList.native-70068878.js';

var Divider = function Divider(_ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "style"]);
  var theme = useTheme();
  return React__default.createElement(View, _extends({
    accessibilityRole: "separator",
    className: useClassList()
  }, props, {
    style: [get(theme, ['divider']), style]
  }));
};

export { Divider };
//# sourceMappingURL=divider.js.map
