'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-a237c005.js');
require('./view.native-ab314649.js');
require('@keg-hub/re-theme/styleInjector');
var view = require('./view-a5f2a568.js');
var reTheme = require('@keg-hub/re-theme');
var useClassList = require('./useClassList-9eaefcd6.js');

var Section = reTheme.withTheme(function (props) {
  var className = props.className,
      theme = props.theme,
      children = props.children,
      style = props.style,
      type = props.type,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "theme", "children", "style", "type"]);
  return React__default.createElement(view.View, _rollupPluginBabelHelpers._extends({}, args, {
    className: useClassList.useClassList('keg-section', className),
    accessibilityRole: "region",
    style: theme.get("section.default", type && "section.".concat(type), style)
  }), children);
});

exports.Section = Section;
//# sourceMappingURL=section.js.map
