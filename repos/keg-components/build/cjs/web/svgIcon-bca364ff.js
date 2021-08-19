'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var svgIcon_native = require('./svgIcon.native-82b9d93c.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

var SvgIcon = styleInjector.StyleInjector(svgIcon_native.SvgIcon, {
  displayName: 'SvgIcon',
  className: 'keg-svg-icon'
});
SvgIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2({}, svgIcon_native.SvgIcon.propTypes);

exports.SvgIcon = SvgIcon;
//# sourceMappingURL=svgIcon-bca364ff.js.map
