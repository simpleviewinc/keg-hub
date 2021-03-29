import { _ as _objectSpread2, a as _defineProperty } from './_rollupPluginBabelHelpers-b6f65682.js';
import { g as getColorSurface } from './colors-6402d3b3.js';
import { get, checkCall } from '@keg-hub/jsutils';
import { g as getThemeDefaults } from './themeDefaults-ae219f8e.js';
import '@keg-hub/re-theme/colors';

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

export { buildColorStyles, buildSurfaceStyles };
//# sourceMappingURL=buildColorStyles.js.map
