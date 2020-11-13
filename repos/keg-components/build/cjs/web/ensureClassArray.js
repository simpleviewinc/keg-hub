'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsutils = require('@keg-hub/jsutils');

var ensureClassArray = function ensureClassArray(classList) {
  var ensured = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return jsutils.eitherArr(classList, [classList]).reduce(function (classNames, item) {
    jsutils.isObj(item) ? item.className ? ensureClassArray(item.className, classNames) :
    Object.keys(item).map(function (key) {
      return jsutils.isObj(item[key]) && ensureClassArray(item[key], classNames);
    }) : jsutils.isArr(item) ? ensureClassArray(item, classNames) : jsutils.isStr(item) && item.split(' ').map(function (item) {
      return item && classNames.push(item);
    });
    return classNames;
  }, ensured);
};

exports.ensureClassArray = ensureClassArray;
//# sourceMappingURL=ensureClassArray.js.map
