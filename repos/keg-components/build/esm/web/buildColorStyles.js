import { _ as _objectSpread2, a as _defineProperty } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, checkCall } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import { c as colors, g as getThemeDefaults } from './colors-3366b3e1.js';
import '@keg-hub/re-theme/colors';

var defaults = getThemeDefaults();
var colorSurface = get(colors, 'surface', {});
var colorStyles = function colorStyles(type, states, cb) {
  return Object.keys(states).reduce(function (built, key) {
    return _objectSpread2(_objectSpread2({}, built), {}, _defineProperty({}, key, checkCall(cb, type, colorSurface[type], key)));
  }, {});
};
var buildColorStyles = function buildColorStyles(states, cb) {
  return Object.keys(get(defaults, 'colors.types', {})).reduce(function (built, type) {
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

export { buildColorStyles, buildSurfaceStyles };
//# sourceMappingURL=buildColorStyles.js.map
