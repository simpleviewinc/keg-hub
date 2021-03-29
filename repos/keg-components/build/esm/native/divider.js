import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { useTheme } from '@keg-hub/re-theme';
import { get } from '@keg-hub/jsutils';
import { V as View } from './view.native-b0b1ddd4.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import 'react-native';
import './useClassName.native-32e8827d.js';

var Divider = React.forwardRef(function (_ref, ref) {
  _ref.className;
      var style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "style"]);
  var theme = useTheme();
  return React.createElement(View, _extends({
    ref: ref,
    accessibilityRole: "separator",
    className: useClassList()
  }, props, {
    style: [get(theme, ['divider']), style]
  }));
});

export { Divider };
//# sourceMappingURL=divider.js.map
