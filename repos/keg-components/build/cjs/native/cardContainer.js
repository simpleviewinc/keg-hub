'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('react-native');
require('./useClassName.native-3d1a229b.js');
var view_native = require('./view.native-20f555a1.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');

var CardContainer = function CardContainer(_ref) {
  var className = _ref.className,
      _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? jsutils.noOpObj : _ref$attributes,
      children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? jsutils.noPropObj : _ref$styles;
  return React__default.createElement(view_native.View, _rollupPluginBabelHelpers._extends({
    className: useClassList_native.useClassList()
  }, attributes, {
    style: styles.main
  }), React__default.createElement(view_native.View, {
    className: "keg-card-container",
    style: styles.container
  }, children));
};

exports.CardContainer = CardContainer;
//# sourceMappingURL=cardContainer.js.map
