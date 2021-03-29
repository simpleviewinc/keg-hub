'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var view = require('./view-276572bd.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native');
var useClassList = require('./useClassList-89a8dbd4.js');
var reTheme = require('@keg-hub/re-theme');
require('./view.native-99366b4b.js');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Form = React__default['default'].forwardRef(function (props, ref) {
  var theme = reTheme.useTheme();
  var children = props.children,
      className = props.className;
      props.elType;
      var style = props.style,
      type = props.type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.form.".concat(type || 'default') : _props$themePath,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["children", "className", "elType", "style", "type", "themePath"]);
  var formTheme = useThemePath.useThemePath(themePath);
  return React__default['default'].createElement(view.View, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "form",
    className: useClassList.useClassList('keg-form', className)
  }, elProps, {
    style: [jsutils.get(theme, 'form.form.default'), formTheme, style],
    ref: ref
  }), children);
});

exports.Form = Form;
//# sourceMappingURL=form.js.map
