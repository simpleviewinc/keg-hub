import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { V as View } from './view.native-f7a27d15.js';
import { get } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { u as useClassList } from './useClassList.native-70068878.js';
import { useTheme } from '@keg-hub/re-theme';
import './useClassName.native-32e8827d.js';

var _excluded = ["children", "className", "elType", "style", "type", "themePath"];
var Form = React__default.forwardRef(function (props, ref) {
  var theme = useTheme();
  var children = props.children;
      props.className;
      props.elType;
      var style = props.style,
      type = props.type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.form.".concat(type || 'default') : _props$themePath,
      elProps = _objectWithoutProperties(props, _excluded);
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
