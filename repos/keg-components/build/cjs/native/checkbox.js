'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var text = require('./text.js');
var checkbox_wrapper = require('./checkbox.wrapper-5a3b3816.js');
require('./kegText-e1842e1b.js');
require('@keg-hub/jsutils');
require('./kegText.js');
require('./useClassName.native-3d1a229b.js');
require('react-native');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');
require('./view.native-5d72f4dd.js');
require('./caption.js');
require('./h1.js');
require('./h2.js');
require('./h3.js');
require('./h4.js');
require('./h5.js');
require('./h6.js');
require('./label.js');
require('./p.js');
require('./subtitle.js');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./getOnChangeHandler.js');
require('./getChecked.js');
require('@keg-hub/re-theme/colors');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList.native-9e7810c9.js');
require('./useThemeTypeAsClass.native-90f04031.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["theme", "style", "wrapper", "children", "onClick", "onPress", "text"];
var Element = reTheme.withTheme(function (props) {
  props.theme;
      props.style;
      props.wrapper;
      props.children;
      props.onClick;
      props.onPress;
      var text$1 = props.text,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  return React__default['default'].createElement(text.Text, _rollupPluginBabelHelpers._extends({}, args, {
    style: {}
  }), text$1);
});
var Checkbox = function Checkbox(props) {
  return React__default['default'].createElement(checkbox_wrapper.CheckboxWrapper, _rollupPluginBabelHelpers._extends({}, props, {
    elType: 'checkbox',
    Element: Element,
    isWeb: true
  }));
};

exports.Checkbox = Checkbox;
//# sourceMappingURL=checkbox.js.map
