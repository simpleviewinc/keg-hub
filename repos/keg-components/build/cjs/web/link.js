'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var getPlatform = require('./getPlatform-ec53cd5e.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./getPressHandler.js');
require('./ensureClassArray.js');
require('./getTarget.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-6b6da47b.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextAccessibility.js');
require('./kegText.native-dfad83ae.js');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
var kegText = require('./kegText-b42d09ba.js');
var useClassList = require('./useClassList-9eaefcd6.js');
var touchable = require('./touchable.js');
var link_wrapper = require('./link.wrapper-fbe6fd2d.js');

var isWeb = getPlatform.getPlatform() === 'web';
var Text = kegText.KegText('link');
var Element = React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href,
      onPress = props.onPress,
      style = props.style,
      target = props.target,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React__default.createElement(touchable.Touchable, _rollupPluginBabelHelpers._extends({
    className: useClassList.useClassList('keg-link', className)
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
