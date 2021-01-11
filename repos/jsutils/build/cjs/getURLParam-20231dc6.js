'use strict';

var validate = require('./validate-500f268a.js');
var isArr = require('./isArr-39234014.js');
var isStr = require('./isStr-8a57710e.js');
var isNum = require('./isNum-c7164b50.js');
var isColl = require('./isColl-5757310a.js');
var isBool = require('./isBool-aa6af74e.js');
var reduceObj = require('./reduceObj-33ce053a.js');

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
          currentQueryItems[itemSplit[0]] = isArr.isArr(val) ? val.push(decodeURIComponent(itemSplit[1])) : [val, decodeURIComponent(itemSplit[1])];
        } else currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
    }
  });
  return currentQueryItems;
};

const objToQuery = obj => {
  let firstSet;
  return reduceObj.reduceObj(obj, (key, value, urlStr) => {
    if (!value) return urlStr;
    const useVal = isStr.isStr(value) || isNum.isNum(value) || isBool.isBool(value) ? value : isColl.isColl(value) ? isArr.isArr(value) ? value.join(',') : JSON.stringify(value) : null;
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
  const [valid] = validate.validate({
    paramKey
  }, {
    paramKey: isStr.isStr
  });
  if (!valid) return null;
  const doc = typeof document !== 'undefined' ? document : null;
  const search = doc === null || doc === void 0 ? void 0 : (_doc$location = doc.location) === null || _doc$location === void 0 ? void 0 : _doc$location.search;
  return isStr.isStr(search) ? (_queryToObj$paramKey = (_queryToObj = queryToObj(search)) === null || _queryToObj === void 0 ? void 0 : _queryToObj[paramKey]) !== null && _queryToObj$paramKey !== void 0 ? _queryToObj$paramKey : null : null;
};

exports.getURLParam = getURLParam;
exports.isValidUrl = isValidUrl;
exports.objToQuery = objToQuery;
exports.queryToObj = queryToObj;
//# sourceMappingURL=getURLParam-20231dc6.js.map
