'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var view_native = require('./view.native-5d72f4dd.js');
var jsutils = require('@keg-hub/jsutils');
var text = require('./text.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('./_rollupPluginBabelHelpers-95f0bff4.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./kegText-e1842e1b.js');
require('./kegText.js');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');
require('@keg-hub/re-theme');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CardCallout = function CardCallout(_ref) {
  _ref.className;
      var subtitle = _ref.subtitle,
      title = _ref.title,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? jsutils.noPropObj : _ref$styles;
  var calloutStyles = jsutils.get(styles, "callout");
  return React__default['default'].createElement(view_native.View, {
    className: useClassList_native.useClassList(),
    style: calloutStyles.overlay
  }, title && React__default['default'].createElement(text.Text, {
    className: "keg-card-title",
    style: calloutStyles.title
  }, title), subtitle && React__default['default'].createElement(text.Text, {
    className: "keg-card-subtitle",
    style: calloutStyles.subtitle
  }, subtitle));
};

exports.CardCallout = CardCallout;
//# sourceMappingURL=cardCallout.js.map
