import { v as validate } from './validate-0eec5ac6.js';
import { i as isArr } from './isArr-a4420764.js';
import { i as isStr } from './isStr-481ce69b.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import { i as isColl } from './isColl-15a1452b.js';
import { i as isBool } from './isBool-4d844d9e.js';
import { r as reduceObj } from './reduceObj-7d9f0ad1.js';

const queryToObj = string => {
  const currentQueryItems = {};
  const stringSplit = string.split('?');
  const querystring = stringSplit[stringSplit.length - 1];
  if (!querystring) return currentQueryItems;
  const split = querystring.split('&');
  split.length && split.map(item => {
    const components = item.split('=');
    if (components.length <= 1) return currentQueryItems;
    const itemSplit = [components.shift(), components.join('=')];
    if (itemSplit.length === 2) {
      const array = decodeURIComponent(itemSplit[1]).split(',');
      if (array && array.length > 1) currentQueryItems[itemSplit[0]] = array;
      else if (itemSplit[0] in currentQueryItems) {
          const val = currentQueryItems[itemSplit[0]];
          currentQueryItems[itemSplit[0]] = isArr(val) ? val.push(decodeURIComponent(itemSplit[1])) : [val, decodeURIComponent(itemSplit[1])];
        } else currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
    }
  });
  return currentQueryItems;
};

const objToQuery = obj => {
  let firstSet;
  return reduceObj(obj, (key, value, urlStr) => {
    if (!value) return urlStr;
    const useVal = isStr(value) || isNum(value) || isBool(value) ? value : isColl(value) ? isArr(value) ? value.join(',') : JSON.stringify(value) : null;
    if (!useVal) return urlStr;
    urlStr = !firstSet ? `?${encodeURIComponent(key)}=${encodeURIComponent(useVal)}` : `${urlStr}&${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`;
    firstSet = true;
    return urlStr;
  }, '');
};

const isValidUrl = string => {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return regexp.test(string);
};

const getURLParam = paramKey => {
  var _doc$location, _queryToObj$paramKey, _queryToObj;
  const [valid] = validate({
    paramKey
  }, {
    paramKey: isStr
  });
  if (!valid) return null;
  const doc = typeof document !== 'undefined' ? document : null;
  const search = doc === null || doc === void 0 ? void 0 : (_doc$location = doc.location) === null || _doc$location === void 0 ? void 0 : _doc$location.search;
  return isStr(search) ? (_queryToObj$paramKey = (_queryToObj = queryToObj(search)) === null || _queryToObj === void 0 ? void 0 : _queryToObj[paramKey]) !== null && _queryToObj$paramKey !== void 0 ? _queryToObj$paramKey : null : null;
};

export { getURLParam as g, isValidUrl as i, objToQuery as o, queryToObj as q };
//# sourceMappingURL=getURLParam-ba57cf43.js.map
