import { get, reduceObj, isArr, isStr } from '@keg-hub/jsutils';
import { d as defaults$1 } from './defaults-0fca2f7d.js';
import { opacity, shadeHex } from '@keg-hub/re-theme/colors';

var __themeDefaults = defaults$1;
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

export { colors as c, getThemeDefaults as g };
//# sourceMappingURL=colors-3366b3e1.js.map
