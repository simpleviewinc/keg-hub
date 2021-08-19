import React__default from 'react';
import { V as View } from './view.native-f7a27d15.js';
import { noPropObj } from '@keg-hub/jsutils';
import { CardCallout } from './cardCallout.js';
import './_rollupPluginBabelHelpers-b49fe34a.js';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './text.js';
import './kegText-97d3d571.js';
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
