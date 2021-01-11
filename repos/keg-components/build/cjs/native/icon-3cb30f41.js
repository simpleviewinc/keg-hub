'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
var isValidComponent = require('./isValidComponent.js');
var renderFromType = require('./renderFromType.js');
require('react-native');
var view_native = require('./view.native-20f555a1.js');
var reTheme = require('@keg-hub/re-theme');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');

var Icon = React__default.forwardRef(function (props, ref) {
  var theme = reTheme.useTheme();
  var className = props.className,
      color = props.color,
      Component = props.Component,
      _props$Element = props.Element,
      Element = _props$Element === void 0 ? Component : _props$Element,
      name = props.name,
      size = props.size,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "color", "Component", "Element", "name", "size", "styles", "themePath", "type"]);
  if (!isValidComponent.isValidComponent(Element)) return console.error("Invalid Element passed to Icon component!", Element) || null;
  var iconStyles = useThemePath.useThemePath(themePath || "icon.".concat(type), styles);
  var iconProps = {
    ref: ref,
    name: name,
    style: iconStyles.icon,
    color: color || iconStyles.color || jsutils.get(iconStyles, 'icon.color') || jsutils.get(theme, 'typography.default.color'),
    size: parseInt(size || jsutils.get(iconStyles, 'icon.fontSize') || jsutils.get(theme, 'typography.default.fontSize', 15) * 2, 10)
  };
  return React__default.createElement(view_native.View, {
    className: useClassList_native.useClassList(),
    style: iconStyles.container
  }, renderFromType.renderFromType(Element, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, attrs), iconProps)));
});

exports.Icon = Icon;
//# sourceMappingURL=icon-3cb30f41.js.map
