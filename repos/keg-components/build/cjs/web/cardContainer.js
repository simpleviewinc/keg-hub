'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var view = require('./view-276572bd.js');
var useClassList = require('./useClassList-89a8dbd4.js');
var jsutils = require('@keg-hub/jsutils');
require('./view.native-99366b4b.js');
require('react-native');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CardContainer = function CardContainer(_ref) {
  var className = _ref.className,
      _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? jsutils.noOpObj : _ref$attributes,
      children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? jsutils.noPropObj : _ref$styles;
  return React__default['default'].createElement(view.View, _rollupPluginBabelHelpers._extends({
    className: useClassList.useClassList('keg-card', className)
  }, attributes, {
    style: styles.main
  }), React__default['default'].createElement(view.View, {
    className: "keg-card-container",
    style: styles.container
  }, children));
};

exports.CardContainer = CardContainer;
//# sourceMappingURL=cardContainer.js.map
