'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var view_native = require('./view.native-5d72f4dd.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var jsutils = require('@keg-hub/jsutils');
require('react-native');
require('./useClassName.native-3d1a229b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CardContainer = function CardContainer(_ref) {
  _ref.className;
      var _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? jsutils.noOpObj : _ref$attributes,
      children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? jsutils.noPropObj : _ref$styles;
  return React__default['default'].createElement(view_native.View, _rollupPluginBabelHelpers._extends({
    className: useClassList_native.useClassList()
  }, attributes, {
    style: styles.main
  }), React__default['default'].createElement(view_native.View, {
    className: "keg-card-container",
    style: styles.container
  }, children));
};

exports.CardContainer = CardContainer;
//# sourceMappingURL=cardContainer.js.map
