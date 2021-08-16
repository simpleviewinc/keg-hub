'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var svgIcon_native = require('./svgIcon.native-82b9d93c.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('react');
require('react-native-svg-web');
require('@keg-hub/re-theme');
require('@keg-hub/jsutils');

var SvgIcon = styleInjector.StyleInjector(svgIcon_native.SvgIcon, {
  displayName: 'SvgIcon',
  className: 'keg-svg-icon'
});
SvgIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2({}, svgIcon_native.SvgIcon.propTypes);

exports.SvgIcon = SvgIcon;
//# sourceMappingURL=svgIcon.js.map
