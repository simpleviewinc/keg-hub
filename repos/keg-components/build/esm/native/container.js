import { d as _objectWithoutProperties, e as _extends, c as _toConsumableArray } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default, { useMemo } from 'react';
import { V as View } from './view.native-f7a27d15.js';
import { isArr, pickKeys, noPropObj } from '@keg-hub/jsutils';
import { getPressHandler } from './getPressHandler.js';
import { g as getPlatform } from './getPlatform-e625f46a.js';
import '@keg-hub/re-theme/colors';
import 'react-native';
import './useClassName.native-32e8827d.js';

var _excluded = ["onPress", "onClick", "children", "flexDir", "size", "style"];
var useHasWidth = function useHasWidth(styles) {
  return useMemo(function () {
    return styles.map(function (style) {
      return Boolean(Object.keys(pickKeys(style, ['width', 'minWidth', 'maxWidth'])).length);
    }).indexOf(true) !== -1;
  }, styles);
};
var Container = function Container(_ref) {
  var onPress = _ref.onPress,
      onClick = _ref.onClick,
      children = _ref.children,
      flexDir = _ref.flexDir,
      size = _ref.size,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? noPropObj : _ref$style,
      props = _objectWithoutProperties(_ref, _excluded);
  var containerStyles = isArr(style) ? style : [style];
  var hasWidth = useHasWidth(containerStyles);
  var flexStyle = flexDir === 'row' ? {
    flexDirection: flexDir,
    flex: size ? size : hasWidth ? 0 : 1
  } : {};
  return React__default.createElement(View, _extends({}, props, {
    style: [flexStyle].concat(_toConsumableArray(containerStyles))
  }, getPressHandler(getPlatform(), onClick || onPress)), children);
};

export { Container };
//# sourceMappingURL=container.js.map
