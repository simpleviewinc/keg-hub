'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var colors$1 = require('@keg-hub/re-theme/colors');
var jsutils = require('@keg-hub/jsutils');
var themeDefaults = require('./themeDefaults-f48ffcaf.js');

var __colors = {};
var clearColorsStyles = function clearColorsStyles() {
  return __colors = {};
};
var getColorSurface = function getColorSurface() {
  return jsutils.get(__colors, 'surface', {});
};
var colors = function colors(defaults) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noOpObj;
  var defPalette = jsutils.get(defaults, 'colors.palette', {});
  var defTypes = jsutils.get(defaults, 'colors.types', {});
  __colors = {
    opacity: colors$1.opacity,
    types: defTypes,
    palette: jsutils.reduceObj(defPalette, function (key, value, updated) {
      !jsutils.isArr(value) ? updated[key] = value : value.map(function (val, i) {
        var name = "".concat(key, "0").concat(i + 1);
        updated[name] = jsutils.isStr(val) ? val : colors$1.shadeHex(value[1], value[i]);
      });
      return updated;
    }, {})
  };
  __colors.surface = jsutils.deepMerge(jsutils.reduceObj(defTypes, function (key, value, updated) {
    updated[key] = {
      colors: {
        light: __colors.palette["".concat(value.palette, "01")],
        main: __colors.palette["".concat(value.palette, "02")],
        dark: __colors.palette["".concat(value.palette, "03")]
      }
    };
    return updated;
  }, {}), config.colors);
  return __colors;
};

var colorStyles = function colorStyles(colorSurface, type, states, cb) {
  return Object.keys(states).reduce(function (built, key) {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, built), {}, _rollupPluginBabelHelpers._defineProperty({}, key, jsutils.checkCall(cb, type, colorSurface[type], key)));
  }, {});
};
var buildColorStyles = function buildColorStyles(states, cb) {
  var defaults = themeDefaults.getThemeDefaults();
  var colorSurface = getColorSurface();
  return Object.keys(jsutils.get(defaults, 'colors.types', {})).reduce(function (built, type) {
    var styles = colorStyles(colorSurface, type, states, cb);
    styles && (built[type] = styles);
    return built;
  }, {});
};
var buildSurfaceStyles = function buildSurfaceStyles(cb) {
  var colorSurface = getColorSurface();
  return Object.keys(colorSurface).reduce(function (surfaceStyles, surface) {
    surfaceStyles[surface] = jsutils.checkCall(cb, surface, colorSurface);
    return surfaceStyles;
  }, {});
};

exports.buildColorStyles = buildColorStyles;
exports.buildSurfaceStyles = buildSurfaceStyles;
exports.clearColorsStyles = clearColorsStyles;
exports.colors = colors;
//# sourceMappingURL=buildColorStyles-32b9ba1d.js.map
