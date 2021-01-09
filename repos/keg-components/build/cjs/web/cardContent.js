'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-6b6da47b.js');
require('./view.native-e2bb0f89.js');
require('@keg-hub/re-theme/styleInjector');
var view = require('./view-ea13da55.js');
require('./useTextAccessibility.js');
require('./kegText.native-dfad83ae.js');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-b42d09ba.js');
require('./text.js');
require('./useClassList-9eaefcd6.js');
var cardCallout = require('./cardCallout.js');

var CardContent = function CardContent(_ref) {
  var children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? jsutils.noPropObj : _ref$styles,
      subtitle = _ref.subtitle,
      title = _ref.title;
  return React__default.createElement(view.View, {
    className: "keg-card-content",
    style: styles.main
  }, (title || subtitle) && React__default.createElement(cardCallout.CardCallout, {
    className: "keg-card-content-callout",
    styles: styles,
    subtitle: subtitle,
    title: title
  }), children);
};

exports.CardContent = CardContent;
//# sourceMappingURL=cardContent.js.map
