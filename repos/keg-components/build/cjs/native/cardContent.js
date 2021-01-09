'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('react-native');
require('./useClassName.native-3d1a229b.js');
var view_native = require('./view.native-20f555a1.js');
require('./useTextAccessibility.js');
require('./kegText.js');
require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-3f09043e.js');
require('./text.js');
require('./useClassList.native-9e7810c9.js');
var cardCallout = require('./cardCallout.js');

var CardContent = function CardContent(_ref) {
  var children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? jsutils.noPropObj : _ref$styles,
      subtitle = _ref.subtitle,
      title = _ref.title;
  return React__default.createElement(view_native.View, {
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
