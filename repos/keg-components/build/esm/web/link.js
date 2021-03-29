import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { L as LinkWrapper } from './link.wrapper-3ac32a3b.js';
import { K as KegText } from './kegText-5c4aeb4b.js';
import { Touchable } from './touchable.js';
import { g as getPlatform } from './getPlatform-95568099.js';
import { u as useClassList } from './useClassList-1d418045.js';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';
import './getPressHandler.js';
import './getTarget.js';
import '@keg-hub/re-theme/colors';
import './kegText.native-be460636.js';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import 'react-native';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';

var isWeb = getPlatform() === 'web';
var Text = KegText('link');
var Element = React.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href;
      props.onPress;
      var style = props.style,
      target = props.target,
      attrs = _objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React.createElement(Touchable, _extends({
    className: useClassList('keg-link', className)
  }, elProps, attrs, {
    touchRef: ref
  }), React.createElement(Text, {
    accessibilityRole: "link",
    className: "keg-link-text",
    style: style,
    href: href,
    target: target
  }, children));
});
var Link = function Link(props) {
  return React.createElement(LinkWrapper, _extends({}, props, {
    Element: Element,
    isWeb: isWeb
  }));
};

export { Link as A, Link };
//# sourceMappingURL=link.js.map
