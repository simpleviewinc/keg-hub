import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { L as LinkWrapper } from './link.wrapper-a64a3ba8.js';
import { K as KegText } from './kegText-9f80996b.js';
import { Touchable } from './touchable.js';
import { g as getPlatform } from './getPlatform-95568099.js';
import { u as useClassList } from './useClassList-1d418045.js';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';
import './getPressHandler.js';
import './getTarget.js';
import '@keg-hub/re-theme/colors';
import './kegText.native-6bbad9e4.js';
import './useClassName-ed83df40.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import 'react-native-web';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';

var _excluded = ["children", "className", "elProps", "href", "onPress", "style", "target"];
var isWeb = getPlatform() === 'web';
var Text = KegText('link');
var Element = React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href;
      props.onPress;
      var style = props.style,
      target = props.target,
      attrs = _objectWithoutProperties(props, _excluded);
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
