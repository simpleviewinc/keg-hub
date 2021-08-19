'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var colors = require('./colors-da502c66.js');
var useClassList = require('./useClassList-89a8dbd4.js');
var ensureClassArray = require('./ensureClassArray.js');

var useThemeType = function useThemeType(themeLoc, defClass) {
  return React.useMemo(function () {
    var defClassArr = ensureClassArray.ensureClassArray(defClass);
    if (!themeLoc) return defClassArr;
    var themeSplit = themeLoc.split('.');
    var surface = themeSplit.pop();
    var typeRef = themeSplit.pop();
    var surfaces = Object.keys(jsutils.get(colors.colors, 'surface', jsutils.noOpObj));
    return typeRef && surfaces.includes(surface) ? ["".concat(defClass, "-").concat(typeRef), surface] : surface ? ["".concat(defClass, "-").concat(surface)] : defClassArr;
  }, [themeLoc, defClass]);
};
var useThemeTypeAsClass = function useThemeTypeAsClass() {
  var themeLoc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var defClass = arguments.length > 1 ? arguments[1] : undefined;
  var className = arguments.length > 2 ? arguments[2] : undefined;
  var themeTypeCls = useThemeType(themeLoc, defClass);
  var classList = jsutils.isArr(className) ? className.concat(themeTypeCls) : [].concat(_rollupPluginBabelHelpers._toConsumableArray(themeTypeCls), [className]);
  return useClassList.useClassList(defClass, classList);
};

exports.useThemeTypeAsClass = useThemeTypeAsClass;
//# sourceMappingURL=useThemeTypeAsClass-9fb8a8ab.js.map
