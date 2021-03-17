'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var view_native = require('./view.native-b34604af.js');
var jsutils = require('@keg-hub/jsutils');
var cardCallout = require('./cardCallout.js');
require('./_rollupPluginBabelHelpers-bb55ccbe.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./text.js');
require('./kegText-965ef4d3.js');
require('./kegText.js');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');
require('@keg-hub/re-theme');
require('./useClassList.native-9e7810c9.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CardContent = function CardContent(_ref) {
  var children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? jsutils.noPropObj : _ref$styles,
      subtitle = _ref.subtitle,
      title = _ref.title;
  return React__default['default'].createElement(view_native.View, {
    className: "keg-card-content",
    style: styles.main
  }, (title || subtitle) && React__default['default'].createElement(cardCallout.CardCallout, {
    className: "keg-card-content-callout",
    styles: styles,
    subtitle: subtitle,
    title: title
  }), children);
};

exports.CardContent = CardContent;
//# sourceMappingURL=cardContent.js.map
