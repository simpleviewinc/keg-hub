import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './buildColorStyles-a1255086.js';
import '@keg-hub/re-theme/colors';
import './platformFlatten-50b3991b.js';
import './buildTheme.js';
import React__default from 'react';
import 'react-native';
import './useClassName.native-32e8827d.js';
import { V as View } from './view.native-54e7e7ef.js';
import { useTheme } from '@keg-hub/re-theme';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList.native-70068878.js';

var Form = React__default.forwardRef(function (props, ref) {
  var theme = useTheme();
  var children = props.children,
      className = props.className,
      elType = props.elType,
      style = props.style,
      type = props.type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.form.".concat(type || 'default') : _props$themePath,
      elProps = _objectWithoutProperties(props, ["children", "className", "elType", "style", "type", "themePath"]);
  var formTheme = useThemePath(themePath);
  return React__default.createElement(View, _extends({
    accessibilityRole: "form",
    className: useClassList()
  }, elProps, {
    style: [get(theme, 'form.form.default'), formTheme, style],
    ref: ref
  }), children);
});

export { Form };
//# sourceMappingURL=form.js.map
