'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var link_wrapper = require('./link.wrapper-958b0c3b.js');
var kegText = require('./kegText-b0f1b442.js');
var touchable = require('./touchable.js');
var getPlatform = require('./getPlatform-ec53cd5e.js');
var useClassList = require('./useClassList-89a8dbd4.js');
require('@keg-hub/re-theme');
require('@keg-hub/jsutils');
require('./getPressHandler.js');
require('./getTarget.js');
require('@keg-hub/re-theme/colors');
require('./kegText.native-100193df.js');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('react-native-web');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["children", "className", "elProps", "href", "onPress", "style", "target"];
var isWeb = getPlatform.getPlatform() === 'web';
var Text = kegText.KegText('link');
var Element = React__default['default'].forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href;
      props.onPress;
      var style = props.style,
      target = props.target,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  return React__default['default'].createElement(touchable.Touchable, _rollupPluginBabelHelpers._extends({
    className: useClassList.useClassList('keg-link', className)
  }, elProps, attrs, {
    touchRef: ref
  }), React__default['default'].createElement(Text, {
    accessibilityRole: "link",
    className: "keg-link-text",
    style: style,
    href: href,
    target: target
  }, children));
});
var Link = function Link(props) {
  return React__default['default'].createElement(link_wrapper.LinkWrapper, _rollupPluginBabelHelpers._extends({}, props, {
    Element: Element,
    isWeb: isWeb
  }));
};

exports.A = Link;
exports.Link = Link;
//# sourceMappingURL=link.js.map
