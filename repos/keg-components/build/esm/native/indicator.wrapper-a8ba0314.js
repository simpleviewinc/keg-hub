import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { V as View } from './view.native-f7a27d15.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';

var _excluded = ["alt", "Element", "isWeb", "resizeMode", "size", "styles", "type", "themePath"];
var IndicatorWrapper = function IndicatorWrapper(props) {
  var alt = props.alt,
      Element = props.Element;
      props.isWeb;
      var resizeMode = props.resizeMode,
      size = props.size,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      elProps = _objectWithoutProperties(props, _excluded);
  var builtStyles = useThemePath(themePath || "indicator.".concat(type), styles);
  return React__default.createElement(View, {
    style: builtStyles.container
  }, React__default.createElement(Element, _extends({}, elProps, {
    alt: alt || 'Loading',
    style: builtStyles.icon,
    size: size,
    resizeMode: resizeMode || 'contain'
  })));
};

export { IndicatorWrapper as I };
//# sourceMappingURL=indicator.wrapper-a8ba0314.js.map
