import React from 'react';
import { V as View } from './view.native-b0b1ddd4.js';
import { get, noPropObj } from '@keg-hub/jsutils';
import { Text } from './text.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import './_rollupPluginBabelHelpers-b6f65682.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './kegText-f9567f63.js';
import './kegText.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import '@keg-hub/re-theme';

var CardCallout = function CardCallout(_ref) {
  _ref.className;
      var subtitle = _ref.subtitle,
      title = _ref.title,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles;
  var calloutStyles = get(styles, "callout");
  return React.createElement(View, {
    className: useClassList(),
    style: calloutStyles.overlay
  }, title && React.createElement(Text, {
    className: "keg-card-title",
    style: calloutStyles.title
  }, title), subtitle && React.createElement(Text, {
    className: "keg-card-subtitle",
    style: calloutStyles.subtitle
  }, subtitle));
};

export { CardCallout };
//# sourceMappingURL=cardCallout.js.map
