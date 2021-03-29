import React from 'react';
import { V as View } from './view-2274aefb.js';
import { get, noPropObj } from '@keg-hub/jsutils';
import { Text } from './text.js';
import { u as useClassList } from './useClassList-1d418045.js';
import './view.native-a7f08b5b.js';
import './_rollupPluginBabelHelpers-b6f65682.js';
import 'react-native';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './kegText-5c4aeb4b.js';
import './kegText.native-be460636.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import '@keg-hub/re-theme';

var CardCallout = function CardCallout(_ref) {
  var className = _ref.className,
      subtitle = _ref.subtitle,
      title = _ref.title,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles;
  var calloutStyles = get(styles, "callout");
  return React.createElement(View, {
    className: useClassList('keg-card-callout', className),
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
