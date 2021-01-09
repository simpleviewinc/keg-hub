'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var colors$3 = require('./colors-3022218c.js');
var React = require('react');
var React__default = _interopDefault(React);
var ensureClassArray = require('./ensureClassArray.js');
var useClassList = require('./useClassList-9eaefcd6.js');

var useThemeType = function useThemeType(themeLoc, defClass) {
  return React.useMemo(function () {
    var defClassArr = ensureClassArray.ensureClassArray(defClass);
    if (!themeLoc) return defClassArr;
    var themeSplit = themeLoc.split('.');
    var surface = themeSplit.pop();
    var typeRef = themeSplit.pop();
    var surfaces = Object.keys(jsutils.get(colors$3.colors, 'surface', jsutils.noOpObj));
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
//# sourceMappingURL=useThemeTypeAsClass.js.map
