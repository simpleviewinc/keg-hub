'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
require('./isValidComponent.js');
require('./renderFromType.js');
require('./getOnChangeHandler.js');
require('./getChecked.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./view.native-20f555a1.js');
require('./useTextAccessibility.js');
require('./kegText.js');
require('@keg-hub/re-theme/styleInjector');
var reTheme = require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-3f09043e.js');
var text = require('./text.js');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList.native-9e7810c9.js');
require('./useThemeTypeAsClass.native-90f04031.js');
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
var checkbox_wrapper = require('./checkbox.wrapper-d0165ea9.js');

var Element = reTheme.withTheme(function (props) {
  var theme = props.theme,
      style = props.style,
      wrapper = props.wrapper,
      children = props.children,
      onClick = props.onClick,
      onPress = props.onPress,
      text$1 = props.text,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["theme", "style", "wrapper", "children", "onClick", "onPress", "text"]);
  return React__default.createElement(text.Text, _rollupPluginBabelHelpers._extends({}, args, {
    style: {}
  }), text$1);
});
var Checkbox = function Checkbox(props) {
  return React__default.createElement(checkbox_wrapper.CheckboxWrapper, _rollupPluginBabelHelpers._extends({}, props, {
    elType: 'checkbox',
    Element: Element,
    isWeb: true
  }));
};

exports.Checkbox = Checkbox;
//# sourceMappingURL=checkbox.js.map
