import { _ as _objectSpread2, a as _defineProperty } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, reduceObj, isArr, isStr, checkCall } from '@keg-hub/jsutils';
import { d as defaults$2 } from './defaults-0fca2f7d.js';
import { opacity, shadeHex } from '@keg-hub/re-theme/colors';

var __themeDefaults = defaults$2;
var getThemeDefaults = function getThemeDefaults() {
  return __themeDefaults;
};

var defaults = getThemeDefaults();
var defPalette = get(defaults, 'colors.palette', {});
var defTypes = get(defaults, 'colors.types', {});
var colors = {
  opacity: opacity,
  palette: reduceObj(defPalette, function (key, value, updated) {
    !isArr(value) ? updated[key] = value : value.map(function (val, i) {
      var name = "".concat(key, "0").concat(i + 1);
      updated[name] = isStr(val) ? val : shadeHex(value[1], value[i]);
    });
    return updated;
  }, {})
};
colors.surface = reduceObj(defTypes, function (key, value, updated) {
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
var colorSurface = get(colors, 'surface', {});
var colorStyles = function colorStyles(type, states, cb) {
  return Object.keys(states).reduce(function (built, key) {
    return _objectSpread2(_objectSpread2({}, built), {}, _defineProperty({}, key, checkCall(cb, type, colorSurface[type], key)));
  }, {});
};
var buildColorStyles = function buildColorStyles(states, cb) {
  return Object.keys(get(defaults$1, 'colors.types', {})).reduce(function (built, type) {
    var styles = colorStyles(type, states, cb);
    styles && (built[type] = styles);
    return built;
  }, {});
};
var buildSurfaceStyles = function buildSurfaceStyles(cb) {
  return Object.keys(colorSurface).reduce(function (surfaceStyles, surface) {
    surfaceStyles[surface] = checkCall(cb, surface, colorSurface);
    return surfaceStyles;
  }, {});
};

export { buildColorStyles as a, buildSurfaceStyles as b, colors as c, getThemeDefaults as g };
//# sourceMappingURL=buildColorStyles-a1255086.js.map
