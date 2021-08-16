import React__default from 'react';
import { V as View } from './view.native-f7a27d15.js';
import { get, noPropObj } from '@keg-hub/jsutils';
import { Text } from './text.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import './_rollupPluginBabelHelpers-b49fe34a.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './kegText-97d3d571.js';
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
