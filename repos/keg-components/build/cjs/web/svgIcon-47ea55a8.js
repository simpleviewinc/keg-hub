'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var PropTypes = require('prop-types');
var svgIcon_native = require('./svgIcon.native-b20a6eea.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var SvgIcon = styleInjector.StyleInjector(svgIcon_native.SvgIcon, {
  displayName: 'SvgIcon',
  className: 'keg-svg-icon'
});
SvgIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, svgIcon_native.SvgIcon.propTypes), {}, {
  className: PropTypes__default['default'].string
});

exports.SvgIcon = SvgIcon;
//# sourceMappingURL=svgIcon-47ea55a8.js.map
