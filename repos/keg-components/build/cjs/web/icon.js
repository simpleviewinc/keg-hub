'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
var view = require('./view-276572bd.js');
var renderFromType = require('./renderFromType.js');
require('@keg-hub/re-theme/colors');
var isValidComponent = require('./isValidComponent.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native');
var useClassList = require('./useClassList-89a8dbd4.js');
require('./view.native-99366b4b.js');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Icon = React__default['default'].forwardRef(function (props, ref) {
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
  return React__default['default'].createElement(view.View, {
    className: useClassList.useClassList("keg-icon", className),
    style: iconStyles.container
  }, renderFromType.renderFromType(Element, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, attrs), iconProps)));
});

exports.Icon = Icon;
//# sourceMappingURL=icon.js.map
