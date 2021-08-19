import { c as _toConsumableArray } from './_rollupPluginBabelHelpers-b49fe34a.js';
import { useMemo } from 'react';
import { get, noOpObj, isArr } from '@keg-hub/jsutils';
import { c as colors } from './colors-6402d3b3.js';
import { u as useClassList } from './useClassList-1d418045.js';
import { ensureClassArray } from './ensureClassArray.js';

var useThemeType = function useThemeType(themeLoc, defClass) {
  return useMemo(function () {
    var defClassArr = ensureClassArray(defClass);
    if (!themeLoc) return defClassArr;
    var themeSplit = themeLoc.split('.');
    var surface = themeSplit.pop();
    var typeRef = themeSplit.pop();
    var surfaces = Object.keys(get(colors, 'surface', noOpObj));
    return typeRef && surfaces.includes(surface) ? ["".concat(defClass, "-").concat(typeRef), surface] : surface ? ["".concat(defClass, "-").concat(surface)] : defClassArr;
  }, [themeLoc, defClass]);
};
var useThemeTypeAsClass = function useThemeTypeAsClass() {
  var themeLoc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var defClass = arguments.length > 1 ? arguments[1] : undefined;
  var className = arguments.length > 2 ? arguments[2] : undefined;
  var themeTypeCls = useThemeType(themeLoc, defClass);
  var classList = isArr(className) ? className.concat(themeTypeCls) : [].concat(_toConsumableArray(themeTypeCls), [className]);
  return useClassList(defClass, classList);
};

export { useThemeTypeAsClass as u };
//# sourceMappingURL=useThemeTypeAsClass-fb17085e.js.map
