import { _ as _objectSpread2, a as _defineProperty } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, reduceObj, isArr, isStr, deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils';
import { opacity, shadeHex } from '@keg-hub/re-theme/colors';
import { g as getThemeDefaults } from './themeDefaults-ae219f8e.js';

var __colors = {};
var clearColorsStyles = function clearColorsStyles() {
  return __colors = {};
};
var getColorSurface = function getColorSurface() {
  return get(__colors, 'surface', {});
};
var colors = function colors(defaults) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noOpObj;
  var defPalette = get(defaults, 'colors.palette', {});
  var defTypes = get(defaults, 'colors.types', {});
  __colors = {
    opacity: opacity,
    types: defTypes,
    palette: reduceObj(defPalette, function (key, value, updated) {
      !isArr(value) ? updated[key] = value : value.map(function (val, i) {
        var name = "".concat(key, "0").concat(i + 1);
        updated[name] = isStr(val) ? val : shadeHex(value[1], value[i]);
      });
      return updated;
    }, {})
  };
  __colors.surface = deepMerge(reduceObj(defTypes, function (key, value, updated) {
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
    return _objectSpread2(_objectSpread2({}, built), {}, _defineProperty({}, key, checkCall(cb, type, colorSurface[type], key)));
  }, {});
};
var buildColorStyles = function buildColorStyles(states, cb) {
  var defaults = getThemeDefaults();
  var colorSurface = getColorSurface();
  return Object.keys(get(defaults, 'colors.types', {})).reduce(function (built, type) {
    var styles = colorStyles(colorSurface, type, states, cb);
    styles && (built[type] = styles);
    return built;
  }, {});
};
var buildSurfaceStyles = function buildSurfaceStyles(cb) {
  var colorSurface = getColorSurface();
  return Object.keys(colorSurface).reduce(function (surfaceStyles, surface) {
    surfaceStyles[surface] = checkCall(cb, surface, colorSurface);
    return surfaceStyles;
  }, {});
};

export { clearColorsStyles as a, buildSurfaceStyles as b, colors as c, buildColorStyles as d };
//# sourceMappingURL=buildColorStyles-5c9df6b7.js.map
