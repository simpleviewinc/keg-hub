'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var view_native = require('./view.native-b34604af.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var reTheme = require('@keg-hub/re-theme');
require('./useClassName.native-3d1a229b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Form = React__default['default'].forwardRef(function (props, ref) {
  var theme = reTheme.useTheme();
  var children = props.children;
      props.className;
      props.elType;
      var style = props.style,
      type = props.type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.form.".concat(type || 'default') : _props$themePath,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["children", "className", "elType", "style", "type", "themePath"]);
  var formTheme = useThemePath.useThemePath(themePath);
  return React__default['default'].createElement(view_native.View, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "form",
    className: useClassList_native.useClassList()
  }, elProps, {
    style: [jsutils.get(theme, 'form.form.default'), formTheme, style],
    ref: ref
  }), children);
});

exports.Form = Form;
//# sourceMappingURL=form.js.map
