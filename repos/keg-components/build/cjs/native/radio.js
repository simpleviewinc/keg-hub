'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
var text = require('./text.js');
require('./kegText-965ef4d3.js');
require('./kegText.js');
require('./useClassName.native-3d1a229b.js');
require('react-native');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Radio = reTheme.withTheme(function (props) {
  var theme = props.theme;
      props.children;
      var style = props.style;
      props.onClick;
      props.onPress;
      var text$1 = props.text,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["theme", "children", "style", "onClick", "onPress", "text"]);
  return React__default['default'].createElement(text.Text, _rollupPluginBabelHelpers._extends({}, args, {
    style: [jsutils.get(theme, ['form', 'radio']), style]
  }), text$1);
});

exports.Radio = Radio;
//# sourceMappingURL=radio.js.map
