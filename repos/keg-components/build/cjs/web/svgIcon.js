'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var svgIcon_native = require('./svgIcon.native-d0de8203.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('react');
require('react-native-svg-web');
require('@keg-hub/re-theme');
require('@keg-hub/jsutils');

var KegSvgIcon = svgIcon_native.SvgIcon,
    svgElements = _rollupPluginBabelHelpers._objectWithoutProperties(svgIcon_native.NativeSvg, ["SvgIcon"]);
var SvgIcon = styleInjector.StyleInjector(KegSvgIcon, {
  displayName: 'SvgIcon',
  className: 'keg-svg-icon'
});
Object.assign(SvgIcon, svgElements);
SvgIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2({}, KegSvgIcon.propTypes);

exports.SvgIcon = SvgIcon;
//# sourceMappingURL=svgIcon.js.map
