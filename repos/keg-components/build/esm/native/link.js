import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { L as LinkWrapper } from './link.wrapper-3ac32a3b.js';
import { K as KegText } from './kegText-f9567f63.js';
import { T as Touchable } from './touchable-9cc6e181.js';
import { g as getPlatform } from './getPlatform-e625f46a.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';
import './getPressHandler.js';
import './getTarget.js';
import '@keg-hub/re-theme/colors';
import './kegText.js';
import './useClassName.native-32e8827d.js';
import 'react-native';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import './touchable.js';

var isWeb = getPlatform() === 'web';
var Text = KegText('link');
var Element = React.forwardRef(function (props, ref) {
  var children = props.children;
      props.className;
      var elProps = props.elProps,
      href = props.href;
      props.onPress;
      var style = props.style,
      target = props.target,
      attrs = _objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React.createElement(Touchable, _extends({
    className: useClassList()
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
