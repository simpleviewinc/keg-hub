import React__default from 'react';
import { V as View } from './view-9c41ec1e.js';
import { noPropObj } from '@keg-hub/jsutils';
import { CardCallout } from './cardCallout.js';
import './view.native-2491eb60.js';
import './_rollupPluginBabelHelpers-b49fe34a.js';
import 'react-native-web';
import './useClassName-ed83df40.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './text.js';
import './kegText-9f80996b.js';
import './kegText.native-6bbad9e4.js';
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
