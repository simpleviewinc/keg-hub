import './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { noPropObj } from '@keg-hub/jsutils';
import React__default from 'react';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-6851fdf6.js';
import './view.native-5aeb3e53.js';
import '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-a64440c5.js';
import './useTextAccessibility.js';
import './kegText.native-7cc07481.js';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-653699c8.js';
import './text.js';
import './useClassList-eea8a571.js';
import { CardCallout } from './cardCallout.js';

var CardContent = function CardContent(_ref) {
  var children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles,
      subtitle = _ref.subtitle,
      title = _ref.title;
  return React__default.createElement(View, {
    className: "keg-card-content",
    style: styles.main
  }, (title || subtitle) && React__default.createElement(CardCallout, {
    className: "keg-card-content-callout",
    styles: styles,
    subtitle: subtitle,
    title: title
  }), children);
};

export { CardContent };
//# sourceMappingURL=cardContent.js.map
