'use strict';

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

exports.colors = colors;
exports.getThemeDefaults = getThemeDefaults;
//# sourceMappingURL=colors-b60a70f0.js.map
