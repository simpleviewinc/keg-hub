import React from 'react';
import { V as View } from './view-2274aefb.js';
import { noPropObj } from '@keg-hub/jsutils';
import { CardCallout } from './cardCallout.js';
import './view.native-a7f08b5b.js';
import './_rollupPluginBabelHelpers-b6f65682.js';
import 'react-native';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './text.js';
import './kegText-5c4aeb4b.js';
import './kegText.native-be460636.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import '@keg-hub/re-theme';
import './useClassList-1d418045.js';

var CardContent = function CardContent(_ref) {
  var children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles,
      subtitle = _ref.subtitle,
      title = _ref.title;
  return React.createElement(View, {
    className: "keg-card-content",
    style: styles.main
  }, (title || subtitle) && React.createElement(CardCallout, {
    className: "keg-card-content-callout",
    styles: styles,
    subtitle: subtitle,
    title: title
  }), children);
};

export { CardContent };
//# sourceMappingURL=cardContent.js.map
