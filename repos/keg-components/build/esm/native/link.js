import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { L as LinkWrapper } from './link.wrapper-a64a3ba8.js';
import { K as KegText } from './kegText-97d3d571.js';
import { T as Touchable } from './touchable-ec804bf8.js';
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

var _excluded = ["children", "className", "elProps", "href", "onPress", "style", "target"];
var isWeb = getPlatform() === 'web';
var Text = KegText('link');
var Element = React__default.forwardRef(function (props, ref) {
  var children = props.children;
      props.className;
      var elProps = props.elProps,
      href = props.href;
      props.onPress;
      var style = props.style,
      target = props.target,
      attrs = _objectWithoutProperties(props, _excluded);
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
