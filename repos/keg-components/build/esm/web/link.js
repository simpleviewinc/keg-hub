import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { g as getPlatform } from './getPlatform-95568099.js';
import React__default from 'react';
import './getPressHandler.js';
import './ensureClassArray.js';
import './getTarget.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-a3859346.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextAccessibility.js';
import './kegText.native-231e3dc9.js';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import { K as KegText } from './kegText-fd522d17.js';
import { u as useClassList } from './useClassList-eea8a571.js';
import { Touchable } from './touchable.js';
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
    className: useClassList('keg-link', className)
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
