'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var view = require('./view-276572bd.js');
var jsutils = require('@keg-hub/jsutils');
var cardCallout = require('./cardCallout.js');
require('./view.native-99366b4b.js');
require('./_rollupPluginBabelHelpers-bb55ccbe.js');
require('react-native');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./text.js');
require('./kegText-f2cfdfd4.js');
require('./kegText.native-1994a0b7.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('@keg-hub/re-theme');
require('./useClassList-89a8dbd4.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CardContent = function CardContent(_ref) {
  var children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? jsutils.noPropObj : _ref$styles,
      subtitle = _ref.subtitle,
      title = _ref.title;
  return React__default['default'].createElement(view.View, {
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
