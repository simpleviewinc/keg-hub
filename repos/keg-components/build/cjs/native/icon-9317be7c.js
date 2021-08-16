'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
var view_native = require('./view.native-5d72f4dd.js');
var renderFromType = require('./renderFromType.js');
require('@keg-hub/re-theme/colors');
var isValidComponent = require('./isValidComponent.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native');
var useClassList_native = require('./useClassList.native-9e7810c9.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "color", "Component", "Element", "name", "size", "styles", "themePath", "type"];
var Icon = React__default['default'].forwardRef(function (props, ref) {
  var theme = reTheme.useTheme();
  props.className;
      var color = props.color,
      Component = props.Component,
      _props$Element = props.Element,
      Element = _props$Element === void 0 ? Component : _props$Element,
      name = props.name,
      size = props.size,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  if (!isValidComponent.isValidComponent(Element)) return console.error("Invalid Element passed to Icon component!", Element) || null;
  var iconStyles = useThemePath.useThemePath(themePath || "icon.".concat(type), styles);
  var iconProps = {
    ref: ref,
    name: name,
    style: iconStyles.icon,
    color: color || iconStyles.color || jsutils.get(iconStyles, 'icon.color') || jsutils.get(theme, 'typography.default.color'),
    size: parseInt(size || jsutils.get(iconStyles, 'icon.fontSize') || jsutils.get(theme, 'typography.default.fontSize', 15) * 2, 10)
  };
  return React__default['default'].createElement(view_native.View, {
    className: useClassList_native.useClassList(),
    style: iconStyles.container
  }, renderFromType.renderFromType(Element, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, attrs), iconProps)));
});

exports.Icon = Icon;
//# sourceMappingURL=icon-9317be7c.js.map
