'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var getPlatform = require('./getPlatform-24228c6c.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./getPressHandler.js');
require('./getTarget.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./useTextAccessibility.js');
require('./kegText.js');
require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
var kegText$1 = require('./kegText-3f09043e.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('./touchable.js');
var touchable$1 = require('./touchable-d386e5c0.js');
var link_wrapper = require('./link.wrapper-fbe6fd2d.js');

var isWeb = getPlatform.getPlatform() === 'web';
var Text = kegText$1.KegText('link');
var Element = React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href,
      onPress = props.onPress,
      style = props.style,
      target = props.target,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React__default.createElement(touchable$1.Touchable, _rollupPluginBabelHelpers._extends({
    className: useClassList_native.useClassList()
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
  return React__default.createElement(link_wrapper.LinkWrapper, _rollupPluginBabelHelpers._extends({}, props, {
    Element: Element,
    isWeb: isWeb
  }));
};

exports.A = Link;
exports.Link = Link;
//# sourceMappingURL=link.js.map
