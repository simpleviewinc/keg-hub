'use strict';

var isArr = require('./isArr-39234014.js');
var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');
var hasOwn = require('./hasOwn-7999ca65.js');
var isStr = require('./isStr-8a57710e.js');
var isNum = require('./isNum-c7164b50.js');
var sanitize = require('./sanitize-0a18302d.js');
var isColl = require('./isColl-5757310a.js');
var toBool = require('./toBool-deb350e4.js');
var cloneFunc = require('./cloneFunc-30c0acdd.js');
var deepClone = require('./deepClone-2b548986.js');
var strToType = require('./strToType-7146b905.js');
var log = require('./log-37bbfac6.js');
var reduceObj = require('./reduceObj-33ce053a.js');

const cloneJson = obj => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    log.logData(e.message, 'error');
    return null;
  }
};

const clearObj = (obj, filter) => {
  obj && Object.entries(obj).map(([key, value]) => {
    if (filter && filter.indexOf(key) !== -1) return;
    if (typeof value === 'object') clearObj(value);
    obj[key] = undefined;
    delete obj[key];
  });
};

const eitherObj = (obj1, obj2) => isObj.isObj(obj1) && obj1 || obj2;

const deepMerge = (...sources) => {
  return sources.reduce((merged, source) => {
    const srcCopy = deepClone.deepClone(source);
    return isArr.isArr(srcCopy)
    ? [...(isArr.isArr(merged) && merged || []), ...srcCopy]
    : isObj.isObj(srcCopy)
    ? Object.entries(srcCopy).reduce((joined, [key, value]) => ({ ...joined,
      [key]: isFunc.isFunc(value) ? cloneFunc.cloneFunc(value)
      : isColl.isColl(value) && key in joined
      ? deepMerge(joined[key], value)
      : deepClone.deepClone(value)
    }), merged)
    : merged;
  }, isArr.isArr(sources[0]) && [] || {});
};

const applyToCloneOf = (obj, mutatorCb) => {
  let error;
  if (!obj) error = 'object (Argument 1) in applyToCloneOf, must be defined!';
  if (!isObj.isObj(obj)) error = 'object (Argument 1) in applyToCloneOf, must be an object!';
  if (!mutatorCb) error = 'mutator (Argument 2) in applyToCloneOf, must be defined!';
  if (!isFunc.isFunc(mutatorCb)) error = 'mutator (Argument 2) arg in applyToCloneOf, must be a function!';
  if (error) return console.warn(error) || obj;
  const clone = deepClone.deepClone(obj);
  mutatorCb(clone);
  return clone;
};

const jsonEqual = (one, two) => {
  try {
    return JSON.stringify(one) === JSON.stringify(two);
  } catch (e) {
    return false;
  }
};

const isEntry = maybeEntry => isArr.isArr(maybeEntry) && maybeEntry.length === 2 && (isNum.isNum(maybeEntry[0]) || isStr.isStr(maybeEntry[0]));

const mapEntries = (obj, cb) => {
  if (!isArr.isArr(obj) && !isObj.isObj(obj)) {
    console.error(obj, `Expected array or object for obj. Found ${typeof obj}`);
    return obj;
  }
  if (!isFunc.isFunc(cb)) {
    console.error(`Expected function for cb. Found ${typeof cb}`);
    return obj;
  }
  const entries = Object.entries(obj);
  const initialValue = isArr.isArr(obj) ? [] : {};
  return entries.reduce((obj, [key, value]) => {
    const result = cb(key, value);
    if (!isEntry(result)) {
      console.error(`Callback function must return entry. Found: ${result}. Using current entry instead.`);
      return deepClone.set(obj, key, value);
    }
    return deepClone.set(obj, result[0], result[1]);
  }, initialValue);
};

const mapKeys = (obj, keyMapper) => {
  if (!isObj.isObj(obj) || !isFunc.isFunc(keyMapper)) return obj;
  return mapEntries(obj, (key, value) => [keyMapper(key), value]);
};

const mapObj = (obj, cb) => isObj.isObj(obj) && isFunc.isFunc(cb) && Object.entries(obj).map(([key, value]) => cb(key, value)) || obj;

const isArrMap = obj => {
  if (!isObj.isObj(obj)) return false;
  const values = Object.values(obj);
  return toBool.toBool(values.length && values.every(isArr.isArr));
};

const omitKeys = (obj = {}, keys = []) => isObj.isObj(obj) && reduceObj.reduceObj(obj, (key, _, updated) => {
  keys.indexOf(key) === -1 && (updated[key] = obj[key]);
  return updated;
}, {}) || {};

const pickKeys = (obj = {}, keys = []) => isObj.isObj(obj) && keys.reduce((updated, key) => {
  key in obj && (updated[key] = obj[key]);
  return updated;
}, {}) || {};

const sanitizeCopy = obj => JSON.parse(sanitize.sanitize(JSON.stringify(obj)));

const trimStringFields = object => Object.entries(object).reduce((cleaned, [key, value]) => {
  cleaned[key] = isStr.isStr(value) ? value.trim() : value;
  return cleaned;
}, object);

const toObj = (val, divider, split) => {
  if (isArr.isArr(val)) return Object.keys(val).reduce((obj, key) => {
    obj[key] = val[key];
    return obj;
  }, {});
  if (!isStr.isStr(str)) return {};
  divider = divider || '=';
  split = split || '&';
  return str.split(split).reduce((obj, item) => {
    const sep = item.split(divider);
    obj[sep[0].trim()] = strToType.strToType(sep[1].trim());
    return obj;
  }, {});
};

const keyMap = (arr, toUpperCase) => isArr.isArr(arr) && arr.reduce((obj, key) => {
  if (!isStr.isStr(key)) return obj;
  const use = toUpperCase && key.toUpperCase() || key;
  obj[use] = use;
  return obj;
}, {}) || {};

const everyEntry = (obj, predicate) => {
  if (!obj) {
    console.error(`everyEntry expects argument obj [${obj}] to be defined.`);
    return false;
  }
  if (!isObj.isObj(obj)) {
    console.error(`Argument obj ${obj} must be an object.`);
    return false;
  }
  if (!isFunc.isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into everyEntry must a function. Found: ${predicate}`);
    return false;
  }
  return hasOwn.pipeline(obj, Object.entries, entries => entries.every(([key, value]) => predicate(key, value)));
};

const someEntry = (obj, predicate) => {
  if (!obj) {
    console.error(`someEntry expects argument obj [${obj}] to be defined.`);
    return false;
  }
  if (!isObj.isObj(obj)) {
    console.error(`Argument obj ${obj} must be an object.`);
    return false;
  }
  if (!isFunc.isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into someEntry must a function. Found: ${predicate}`);
    return false;
  }
  return hasOwn.pipeline(obj, Object.entries, entries => entries.some(([key, value]) => predicate(key, value)));
};

const filterObj = (obj, predicate) => {
  if (!obj) return obj;
  if (!isObj.isObj(obj)) {
    console.error(`Object ${obj} was not an object. It must be for filterObject`);
    return obj;
  }
  if (!isFunc.isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into filterObject must a function. Found: ${predicate}`);
    return obj;
  }
  return reduceObj.reduceObj(obj, (key, value, data) => {
    if (predicate(key, value)) data[key] = value;
    return data;
  }, {});
};

exports.applyToCloneOf = applyToCloneOf;
exports.clearObj = clearObj;
exports.cloneJson = cloneJson;
exports.deepMerge = deepMerge;
exports.eitherObj = eitherObj;
exports.everyEntry = everyEntry;
exports.filterObj = filterObj;
exports.isArrMap = isArrMap;
exports.isEntry = isEntry;
exports.jsonEqual = jsonEqual;
exports.keyMap = keyMap;
exports.mapEntries = mapEntries;
exports.mapKeys = mapKeys;
exports.mapObj = mapObj;
exports.omitKeys = omitKeys;
exports.pickKeys = pickKeys;
exports.sanitizeCopy = sanitizeCopy;
exports.someEntry = someEntry;
exports.toObj = toObj;
exports.trimStringFields = trimStringFields;
//# sourceMappingURL=filterObj-aec2acd0.js.map
