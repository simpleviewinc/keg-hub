import { b as _slicedToArray, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { useTheme, useThemeHover } from '@keg-hub/re-theme';
import { get } from '@keg-hub/jsutils';
import { getPressHandler } from './getPressHandler.js';
import { getTarget } from './getTarget.js';
import '@keg-hub/re-theme/colors';

var getSpacer = function getSpacer(isWeb) {
  return isWeb ? ' ' : '\n';
};
var LinkWrapper = function LinkWrapper(props) {
  var theme = useTheme();
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
  var _useThemeHover = useThemeHover(theme.get(linkStyle, style), get(theme, "link.hover")),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 2),
      ref = _useThemeHover2[0],
      themeStyle = _useThemeHover2[1];
  var spacer = space && getSpacer(space);
  return React__default.createElement(React__default.Fragment, null, spacer, React__default.createElement(Element, _extends({
    ref: ref,
    href: href,
    style: themeStyle
  }, getPressHandler(isWeb, onClick, onPress), getTarget(isWeb, target)), children), spacer);
};

export { LinkWrapper as L };
//# sourceMappingURL=link.wrapper-a64a3ba8.js.map
