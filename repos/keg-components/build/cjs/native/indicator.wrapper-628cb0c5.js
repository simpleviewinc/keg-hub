'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
require('react-native');
var view_native = require('./view.native-20f555a1.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');

var IndicatorWrapper = function IndicatorWrapper(props) {
  var alt = props.alt,
      Element = props.Element,
      isWeb = props.isWeb,
      resizeMode = props.resizeMode,
      size = props.size,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["alt", "Element", "isWeb", "resizeMode", "size", "styles", "type", "themePath"]);
  var builtStyles = useThemePath.useThemePath(themePath || "indicator.".concat(type), styles);
  return React__default.createElement(view_native.View, {
    style: builtStyles.container
  }, React__default.createElement(Element, _rollupPluginBabelHelpers._extends({}, elProps, {
    alt: alt || 'Loading',
    style: builtStyles.icon,
    size: size,
    resizeMode: resizeMode || 'contain'
  })));
};

exports.IndicatorWrapper = IndicatorWrapper;
//# sourceMappingURL=indicator.wrapper-628cb0c5.js.map
