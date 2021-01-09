'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
var getPressHandler = require('./getPressHandler.js');
var getTarget = require('./getTarget.js');
var reTheme = require('@keg-hub/re-theme');

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
  return React__default.createElement(React__default.Fragment, null, spacer, React__default.createElement(Element, _rollupPluginBabelHelpers._extends({
    ref: ref,
    href: href,
    style: themeStyle
  }, getPressHandler.getPressHandler(isWeb, onClick, onPress), getTarget.getTarget(isWeb, target)), children), spacer);
};

exports.LinkWrapper = LinkWrapper;
//# sourceMappingURL=link.wrapper-fbe6fd2d.js.map
