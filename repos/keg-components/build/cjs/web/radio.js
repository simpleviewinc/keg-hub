'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var input = require('./input-e65999e6.js');
require('@keg-hub/jsutils');
require('./getInputValue.js');
require('./getReadOnly.js');
require('@keg-hub/re-theme/colors');
require('./useInputHandlers.js');
require('./validateFunctions.js');
require('./usePressHandlers.js');
require('./useThemePath.js');
require('@keg-hub/re-theme');
require('./useThemeWithHeight.js');
require('react-native-web');
require('./input-9de20726.js');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Radio = function Radio(props) {
  return React__default['default'].createElement(input.Input, _rollupPluginBabelHelpers._extends({}, props, {
    type: "radio"
  }));
};

exports.Radio = Radio;
//# sourceMappingURL=radio.js.map
