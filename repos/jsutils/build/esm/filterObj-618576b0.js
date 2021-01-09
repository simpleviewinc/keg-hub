import { i as isArr } from './isArr-a4420764.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { p as pipeline } from './hasOwn-deb5bbb8.js';
import { i as isStr } from './isStr-481ce69b.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import { s as sanitize } from './sanitize-2f5be6f2.js';
import { i as isColl } from './isColl-15a1452b.js';
import { t as toBool } from './toBool-8f49e620.js';
import { c as cloneFunc } from './cloneFunc-8a9b7642.js';
import { d as deepClone, s as set } from './deepClone-853aa91f.js';
import { s as strToType } from './strToType-0d2d490d.js';
import { l as logData } from './log-8543c007.js';
import { r as reduceObj } from './reduceObj-7d9f0ad1.js';

const cloneJson = obj => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    logData(e.message, 'error');
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

const eitherObj = (obj1, obj2) => isObj(obj1) && obj1 || obj2;

const deepMerge = (...sources) => {
  return sources.reduce((merged, source) => {
    const srcCopy = deepClone(source);
    return isArr(srcCopy)
    ? [...(isArr(merged) && merged || []), ...srcCopy]
    : isObj(srcCopy)
    ? Object.entries(srcCopy).reduce((joined, [key, value]) => ({ ...joined,
      [key]: isFunc(value) ? cloneFunc(value)
      : isColl(value) && key in joined
      ? deepMerge(joined[key], value)
      : deepClone(value)
    }), merged)
    : merged;
  }, isArr(sources[0]) && [] || {});
};

const applyToCloneOf = (obj, mutatorCb) => {
  let error;
  if (!obj) error = 'object (Argument 1) in applyToCloneOf, must be defined!';
  if (!isObj(obj)) error = 'object (Argument 1) in applyToCloneOf, must be an object!';
  if (!mutatorCb) error = 'mutator (Argument 2) in applyToCloneOf, must be defined!';
  if (!isFunc(mutatorCb)) error = 'mutator (Argument 2) arg in applyToCloneOf, must be a function!';
  if (error) return console.warn(error) || obj;
  const clone = deepClone(obj);
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

const isEntry = maybeEntry => isArr(maybeEntry) && maybeEntry.length === 2 && (isNum(maybeEntry[0]) || isStr(maybeEntry[0]));

const mapEntries = (obj, cb) => {
  if (!isArr(obj) && !isObj(obj)) {
    console.error(obj, `Expected array or object for obj. Found ${typeof obj}`);
    return obj;
  }
  if (!isFunc(cb)) {
    console.error(`Expected function for cb. Found ${typeof cb}`);
    return obj;
  }
  const entries = Object.entries(obj);
  const initialValue = isArr(obj) ? [] : {};
  return entries.reduce((obj, [key, value]) => {
    const result = cb(key, value);
    if (!isEntry(result)) {
      console.error(`Callback function must return entry. Found: ${result}. Using current entry instead.`);
      return set(obj, key, value);
    }
    return set(obj, result[0], result[1]);
  }, initialValue);
};

const mapKeys = (obj, keyMapper) => {
  if (!isObj(obj) || !isFunc(keyMapper)) return obj;
  return mapEntries(obj, (key, value) => [keyMapper(key), value]);
};

const mapObj = (obj, cb) => isObj(obj) && isFunc(cb) && Object.entries(obj).map(([key, value]) => cb(key, value)) || obj;

const isArrMap = obj => {
  if (!isObj(obj)) return false;
  const values = Object.values(obj);
  return toBool(values.length && values.every(isArr));
};

const omitKeys = (obj = {}, keys = []) => isObj(obj) && reduceObj(obj, (key, _, updated) => {
  keys.indexOf(key) === -1 && (updated[key] = obj[key]);
  return updated;
}, {}) || {};

const pickKeys = (obj = {}, keys = []) => isObj(obj) && keys.reduce((updated, key) => {
  key in obj && (updated[key] = obj[key]);
  return updated;
}, {}) || {};

const sanitizeCopy = obj => JSON.parse(sanitize(JSON.stringify(obj)));

const trimStringFields = object => Object.entries(object).reduce((cleaned, [key, value]) => {
  cleaned[key] = isStr(value) ? value.trim() : value;
  return cleaned;
}, object);

const toObj = (val, divider, split) => {
  if (isArr(val)) return Object.keys(val).reduce((obj, key) => {
    obj[key] = val[key];
    return obj;
  }, {});
  if (!isStr(str)) return {};
  divider = divider || '=';
  split = split || '&';
  return str.split(split).reduce((obj, item) => {
    const sep = item.split(divider);
    obj[sep[0].trim()] = strToType(sep[1].trim());
    return obj;
  }, {});
};

const keyMap = (arr, toUpperCase) => isArr(arr) && arr.reduce((obj, key) => {
  if (!isStr(key)) return obj;
  const use = toUpperCase && key.toUpperCase() || key;
  obj[use] = use;
  return obj;
}, {}) || {};

const everyEntry = (obj, predicate) => {
  if (!obj) {
    console.error(`everyEntry expects argument obj [${obj}] to be defined.`);
    return false;
  }
  if (!isObj(obj)) {
    console.error(`Argument obj ${obj} must be an object.`);
    return false;
  }
  if (!isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into everyEntry must a function. Found: ${predicate}`);
    return false;
  }
  return pipeline(obj, Object.entries, entries => entries.every(([key, value]) => predicate(key, value)));
};

const someEntry = (obj, predicate) => {
  if (!obj) {
    console.error(`someEntry expects argument obj [${obj}] to be defined.`);
    return false;
  }
  if (!isObj(obj)) {
    console.error(`Argument obj ${obj} must be an object.`);
    return false;
  }
  if (!isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into someEntry must a function. Found: ${predicate}`);
    return false;
  }
  return pipeline(obj, Object.entries, entries => entries.some(([key, value]) => predicate(key, value)));
};

const filterObj = (obj, predicate) => {
  if (!obj) return obj;
  if (!isObj(obj)) {
    console.error(`Object ${obj} was not an object. It must be for filterObject`);
    return obj;
  }
  if (!isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into filterObject must a function. Found: ${predicate}`);
    return obj;
  }
  return reduceObj(obj, (key, value, data) => {
    if (predicate(key, value)) data[key] = value;
    return data;
  }, {});
};

export { clearObj as a, applyToCloneOf as b, cloneJson as c, deepMerge as d, eitherObj as e, mapKeys as f, mapObj as g, isArrMap as h, isEntry as i, jsonEqual as j, toObj as k, keyMap as l, mapEntries as m, everyEntry as n, omitKeys as o, pickKeys as p, someEntry as q, filterObj as r, sanitizeCopy as s, trimStringFields as t };
//# sourceMappingURL=filterObj-618576b0.js.map
