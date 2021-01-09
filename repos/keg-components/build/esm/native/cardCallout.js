import './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, noPropObj } from '@keg-hub/jsutils';
import React__default from 'react';
import 'react-native';
import './useClassName.native-32e8827d.js';
import { V as View } from './view.native-54e7e7ef.js';
import './useTextAccessibility.js';
import './kegText.js';
import '@keg-hub/re-theme/styleInjector';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-ef69c4aa.js';
import { Text } from './text.js';
import { u as useClassList } from './useClassList.native-70068878.js';

var CardCallout = function CardCallout(_ref) {
  var className = _ref.className,
      subtitle = _ref.subtitle,
      title = _ref.title,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles;
  var calloutStyles = get(styles, "callout");
  return React__default.createElement(View, {
    className: useClassList(),
    style: calloutStyles.overlay
  }, title && React__default.createElement(Text, {
    className: "keg-card-title",
    style: calloutStyles.title
  }, title), subtitle && React__default.createElement(Text, {
    className: "keg-card-subtitle",
    style: calloutStyles.subtitle
  }, subtitle));
};

export { CardCallout };
//# sourceMappingURL=cardCallout.js.map
