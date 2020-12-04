'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var colors$3 = require('./colors-3022218c.js');
var themeDefaults = require('./themeDefaults-f48ffcaf.js');

var colorStyles = function colorStyles(colorSurface, type, states, cb) {
  return Object.keys(states).reduce(function (built, key) {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, built), {}, _rollupPluginBabelHelpers._defineProperty({}, key, jsutils.checkCall(cb, type, colorSurface[type], key)));
  }, {});
};
var buildColorStyles = function buildColorStyles(states, cb) {
  var defaults = themeDefaults.getThemeDefaults();
  var colorSurface = colors$3.getColorSurface();
  return Object.keys(jsutils.get(defaults, 'colors.types', {})).reduce(function (built, type) {
    var styles = colorStyles(colorSurface, type, states, cb);
    styles && (built[type] = styles);
    return built;
  }, {});
};
var buildSurfaceStyles = function buildSurfaceStyles(cb) {
  var colorSurface = colors$3.getColorSurface();
  return Object.keys(colorSurface).reduce(function (surfaceStyles, surface) {
    surfaceStyles[surface] = jsutils.checkCall(cb, surface, colorSurface);
    return surfaceStyles;
  }, {});
};

exports.buildColorStyles = buildColorStyles;
exports.buildSurfaceStyles = buildSurfaceStyles;
//# sourceMappingURL=buildColorStyles.js.map
