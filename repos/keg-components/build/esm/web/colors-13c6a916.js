import { get, reduceObj, isArr, isStr, deepMerge, noOpObj } from '@keg-hub/jsutils';
import { opacity, shadeHex } from '@keg-hub/re-theme/colors';

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

export { clearColorsStyles as a, colors as c, getColorSurface as g };
//# sourceMappingURL=colors-13c6a916.js.map
