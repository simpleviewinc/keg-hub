'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var link_wrapper = require('./link.wrapper-17089db4.js');
var kegText = require('./kegText-965ef4d3.js');
var touchable = require('./touchable-3f00e0ff.js');
var getPlatform = require('./getPlatform-24228c6c.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('@keg-hub/re-theme');
require('@keg-hub/jsutils');
require('./getPressHandler.js');
require('./getTarget.js');
require('@keg-hub/re-theme/colors');
require('./kegText.js');
require('./useClassName.native-3d1a229b.js');
require('react-native');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');
require('./touchable.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var isWeb = getPlatform.getPlatform() === 'web';
var Text = kegText.KegText('link');
var Element = React__default['default'].forwardRef(function (props, ref) {
  var children = props.children;
      props.className;
      var elProps = props.elProps,
      href = props.href;
      props.onPress;
      var style = props.style,
      target = props.target,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React__default['default'].createElement(touchable.Touchable, _rollupPluginBabelHelpers._extends({
    className: useClassList_native.useClassList()
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
