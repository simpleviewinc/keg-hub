'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var defaults$a = require('./defaults-75e5d8bf.js');
var colors$1 = require('@keg-hub/re-theme/colors');

var __themeDefaults = defaults$a.defaults;
var getThemeDefaults = function getThemeDefaults() {
  return __themeDefaults;
};

var defaults = getThemeDefaults();
var defPalette = jsutils.get(defaults, 'colors.palette', {});
var defTypes = jsutils.get(defaults, 'colors.types', {});
var colors = {
  opacity: colors$1.opacity,
  palette: jsutils.reduceObj(defPalette, function (key, value, updated) {
    !jsutils.isArr(value) ? updated[key] = value : value.map(function (val, i) {
      var name = "".concat(key, "0").concat(i + 1);
      updated[name] = jsutils.isStr(val) ? val : colors$1.shadeHex(value[1], value[i]);
    });
    return updated;
  }, {})
};
colors.surface = jsutils.reduceObj(defTypes, function (key, value, updated) {
  updated[key] = {
    colors: {
      light: colors.palette["".concat(value.palette, "01")],
      main: colors.palette["".concat(value.palette, "02")],
      dark: colors.palette["".concat(value.palette, "03")]
    }
  };
  return updated;
}, {});

var defaults$1 = getThemeDefaults();
var colorSurface = jsutils.get(colors, 'surface', {});
var colorStyles = function colorStyles(type, states, cb) {
  return Object.keys(states).reduce(function (built, key) {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, built), {}, _rollupPluginBabelHelpers._defineProperty({}, key, jsutils.checkCall(cb, type, colorSurface[type], key)));
  }, {});
};
var buildColorStyles = function buildColorStyles(states, cb) {
  return Object.keys(jsutils.get(defaults$1, 'colors.types', {})).reduce(function (built, type) {
    var styles = colorStyles(type, states, cb);
    styles && (built[type] = styles);
    return built;
  }, {});
};
var buildSurfaceStyles = function buildSurfaceStyles(cb) {
  return Object.keys(colorSurface).reduce(function (surfaceStyles, surface) {
    surfaceStyles[surface] = jsutils.checkCall(cb, surface, colorSurface);
    return surfaceStyles;
  }, {});
};

exports.buildColorStyles = buildColorStyles;
exports.buildSurfaceStyles = buildSurfaceStyles;
exports.colors = colors;
exports.getThemeDefaults = getThemeDefaults;
//# sourceMappingURL=buildColorStyles-ca288c4b.js.map
