'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var view_native = require('./view.native-b34604af.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('@keg-hub/jsutils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Section = reTheme.withTheme(function (props) {
  props.className;
      var theme = props.theme,
      children = props.children,
      style = props.style,
      type = props.type,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "theme", "children", "style", "type"]);
  return React__default['default'].createElement(view_native.View, _rollupPluginBabelHelpers._extends({}, args, {
    className: useClassList_native.useClassList(),
    accessibilityRole: "region",
    style: theme.get("section.default", type && "section.".concat(type), style)
  }), children);
});

exports.Section = Section;
//# sourceMappingURL=section.js.map
