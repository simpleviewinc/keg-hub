import React__default from 'react';
import { V as View } from './view-9c41ec1e.js';
import { get, noPropObj } from '@keg-hub/jsutils';
import { Text } from './text.js';
import { u as useClassList } from './useClassList-1d418045.js';
import './view.native-2491eb60.js';
import './_rollupPluginBabelHelpers-b49fe34a.js';
import 'react-native-web';
import './useClassName-ed83df40.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './kegText-9f80996b.js';
import './kegText.native-6bbad9e4.js';
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
  return React__default.createElement(View, {
    className: useClassList('keg-card-callout', className),
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
