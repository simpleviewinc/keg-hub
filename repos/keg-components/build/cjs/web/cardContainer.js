'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
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
var useClassList = require('./useClassList-9eaefcd6.js');

var CardContainer = function CardContainer(_ref) {
  var className = _ref.className,
      _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? jsutils.noOpObj : _ref$attributes,
      children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? jsutils.noPropObj : _ref$styles;
  return React__default.createElement(view.View, _rollupPluginBabelHelpers._extends({
    className: useClassList.useClassList('keg-card', className)
  }, attributes, {
    style: styles.main
  }), React__default.createElement(view.View, {
    className: "keg-card-container",
    style: styles.container
  }, children));
};

exports.CardContainer = CardContainer;
//# sourceMappingURL=cardContainer.js.map
