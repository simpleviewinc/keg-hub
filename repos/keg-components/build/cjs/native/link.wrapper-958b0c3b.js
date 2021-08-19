'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
var getPressHandler = require('./getPressHandler.js');
var getTarget = require('./getTarget.js');
require('@keg-hub/re-theme/colors');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var getSpacer = function getSpacer(isWeb) {
  return isWeb ? ' ' : '\n';
};
var LinkWrapper = function LinkWrapper(props) {
  var theme = reTheme.useTheme();
  var children = props.children,
      Element = props.Element,
      isWeb = props.isWeb,
      href = props.href,
      onPress = props.onPress,
      onClick = props.onClick,
      space = props.space,
      style = props.style,
      target = props.target,
      type = props.type;
  var linkStyle = theme.get('typography.font.family', 'link.default', type && "link.".concat(type));
  var _useThemeHover = reTheme.useThemeHover(theme.get(linkStyle, style), jsutils.get(theme, "link.hover")),
      _useThemeHover2 = _rollupPluginBabelHelpers._slicedToArray(_useThemeHover, 2),
      ref = _useThemeHover2[0],
      themeStyle = _useThemeHover2[1];
  var spacer = space && getSpacer(space);
  return React__default['default'].createElement(React__default['default'].Fragment, null, spacer, React__default['default'].createElement(Element, _rollupPluginBabelHelpers._extends({
    ref: ref,
    href: href,
    style: themeStyle
  }, getPressHandler.getPressHandler(isWeb, onClick, onPress), getTarget.getTarget(isWeb, target)), children), spacer);
};

exports.LinkWrapper = LinkWrapper;
//# sourceMappingURL=link.wrapper-958b0c3b.js.map
