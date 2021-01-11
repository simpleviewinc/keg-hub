import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { g as getPlatform } from './getPlatform-e625f46a.js';
import React__default from 'react';
import './getPressHandler.js';
import './getTarget.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './useTextAccessibility.js';
import './kegText.js';
import '@keg-hub/re-theme/styleInjector';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import { K as KegText } from './kegText-ef69c4aa.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import './touchable.js';
import { T as Touchable } from './touchable-e78a3026.js';
import { L as LinkWrapper } from './link.wrapper-3b9d4577.js';

var isWeb = getPlatform() === 'web';
var Text = KegText('link');
var Element = React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href,
      onPress = props.onPress,
      style = props.style,
      target = props.target,
      attrs = _objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React__default.createElement(Touchable, _extends({
    className: useClassList()
  }, elProps, attrs, {
    touchRef: ref
  }), React__default.createElement(Text, {
    accessibilityRole: "link",
    className: "keg-link-text",
    style: style,
    href: href,
    target: target
  }, children));
});
var Link = function Link(props) {
  return React__default.createElement(LinkWrapper, _extends({}, props, {
    Element: Element,
    isWeb: isWeb
  }));
};

export { Link as A, Link };
//# sourceMappingURL=link.js.map
