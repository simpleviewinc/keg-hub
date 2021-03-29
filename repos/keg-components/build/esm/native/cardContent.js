import React from 'react';
import { V as View } from './view.native-b0b1ddd4.js';
import { noPropObj } from '@keg-hub/jsutils';
import { CardCallout } from './cardCallout.js';
import './_rollupPluginBabelHelpers-b6f65682.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './text.js';
import './kegText-f9567f63.js';
import './kegText.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import '@keg-hub/re-theme';
import './useClassList.native-70068878.js';

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
