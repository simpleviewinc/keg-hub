import { eitherArr, isObj, isArr, isStr } from '@keg-hub/jsutils';

var ensureClassArray = function ensureClassArray(classList) {
  var ensured = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return eitherArr(classList, [classList]).reduce(function (classNames, item) {
    isObj(item) ? item.className ? ensureClassArray(item.className, classNames) :
    Object.keys(item).map(function (key) {
      return isObj(item[key]) && ensureClassArray(item[key], classNames);
    }) : isArr(item) ? ensureClassArray(item, classNames) : isStr(item) && item.split(' ').map(function (item) {
      return item && classNames.push(item);
    });
    return classNames;
  }, ensured);
};

export { ensureClassArray };
//# sourceMappingURL=ensureClassArray.js.map
