'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var view = require('./view-276572bd.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var IndicatorWrapper = function IndicatorWrapper(props) {
  var alt = props.alt,
      Element = props.Element;
      props.isWeb;
      var resizeMode = props.resizeMode,
      size = props.size,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["alt", "Element", "isWeb", "resizeMode", "size", "styles", "type", "themePath"]);
  var builtStyles = useThemePath.useThemePath(themePath || "indicator.".concat(type), styles);
  return React__default['default'].createElement(view.View, {
    style: builtStyles.container
  }, React__default['default'].createElement(Element, _rollupPluginBabelHelpers._extends({}, elProps, {
    alt: alt || 'Loading',
    style: builtStyles.icon,
    size: size,
    resizeMode: resizeMode || 'contain'
  })));
};

exports.IndicatorWrapper = IndicatorWrapper;
//# sourceMappingURL=indicator.wrapper-5ad2a9f5.js.map
