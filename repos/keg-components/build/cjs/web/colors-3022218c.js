'use strict';

var jsutils = require('@keg-hub/jsutils');
var colors$2 = require('@keg-hub/re-theme/colors');

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
    opacity: colors$2.opacity,
    types: defTypes,
    palette: jsutils.reduceObj(defPalette, function (key, value, updated) {
      !jsutils.isArr(value) ? updated[key] = value : value.map(function (val, i) {
        var name = "".concat(key, "0").concat(i + 1);
        updated[name] = jsutils.isStr(val) ? val : colors$2.shadeHex(value[1], value[i]);
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

exports.clearColorsStyles = clearColorsStyles;
exports.colors = colors;
exports.getColorSurface = getColorSurface;
//# sourceMappingURL=colors-3022218c.js.map
