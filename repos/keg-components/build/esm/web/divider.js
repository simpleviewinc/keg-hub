import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { useTheme } from '@keg-hub/re-theme';
import { get } from '@keg-hub/jsutils';
import { V as View } from './view-2274aefb.js';
import { u as useClassList } from './useClassList-1d418045.js';
import './view.native-a7f08b5b.js';
import 'react-native';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';

var Divider = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "style"]);
  var theme = useTheme();
  return React.createElement(View, _extends({
    ref: ref,
    accessibilityRole: "separator",
    className: useClassList('keg-divider', className)
  }, props, {
    style: [get(theme, ['divider']), style]
  }));
});

export { Divider };
//# sourceMappingURL=divider.js.map
