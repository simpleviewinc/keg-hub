import { i as isArr } from './isArr-a4420764.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { i as isStr } from './isStr-481ce69b.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import { i as isColl } from './isColl-15a1452b.js';
import { u as updateColl, g as get } from './get-8e62f069.js';
import { d as deepClone } from './deepClone-853aa91f.js';

const cleanColl = (coll, recursive = true) => {
  return isColl(coll) ? Object.keys(coll).reduce((cleaned, key) => {
    const value = coll[key];
    if (value === null || value === undefined) return cleaned;
    cleaned[key] = recursive && isColl(value) ? cleanColl(value) : value;
    return cleaned;
  }, isObj(coll) && {} || []) : console.error(`cleanColl requires a collection as the first argument`) || coll;
};

const isEmptyColl = obj => isArr(obj) ? obj.length === 0 : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;

const mapColl = (coll, cb) => isFunc(cb) && isColl(coll) ? Object.keys(coll).map(key => cb(key, coll[key], coll)) : isArr(coll) ? [] : {};

const reduceColl = (coll, cb, reduce) => isFunc(cb) && isColl(coll) ? Object.keys(coll).reduce((data, key) => cb(key, coll[key], coll, data), reduce) : isArr(coll) ? [] : {};

const unset = (obj, path) => updateColl(obj, path, 'unset');

const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;
const deepEqual = (a, b) => {
  if (a === b) return true;
  if (!a || !b || typeof a != 'object' || typeof b != 'object') return a !== a && b !== b;
  const arrA = isArray(a);
  const arrB = isArray(b);
  let i;
  let length;
  let key;
  if (arrA && arrB) {
    length = a.length;
    if (length != b.length) return false;
    for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }
  if (arrA != arrB) return false;
  const dateA = a instanceof Date;
  const dateB = b instanceof Date;
  if (dateA != dateB) return false;
  if (dateA && dateB) return a.getTime() == b.getTime();
  const regexpA = a instanceof RegExp;
  const regexpB = b instanceof RegExp;
  if (regexpA != regexpB) return false;
  if (regexpA && regexpB) return a.toString() == b.toString();
  const keys = keyList(a);
  length = keys.length;
  if (length !== keyList(b).length) return false;
  for (i = length; i-- !== 0;) if (!hasProp.call(b, keys[i])) return false;
  for (i = length; i-- !== 0;) {
    key = keys[i];
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
};

const repeat = (element, times, cloneDeep = false) => {
  if (!times || times <= 0) return [];
  if (!isNum(times)) {
    console.error("Times argument must be a number");
    return [];
  }
  const arr = [];
  for (let i = 0; i < times; i++) {
    const value = isFunc(element) ? element() : cloneDeep ? deepClone(element) : element;
    arr.push(value);
  }
  return arr;
};

const shallowEqual = (col1, col2, path) => {
  if (path && (isArr(path) || isStr(path))) {
    col1 = get(col1, path);
    col2 = get(col2, path);
  }
  if (col1 === col2) return true;
  if (!col1 || !isColl(col1) || !col2 || !isColl(col2)) return false;
  if (Object.keys(col1).length !== Object.keys(col2).length) return false;
  for (const key in col1) if (col1[key] !== col2[key]) return false;
  return true;
};

export { repeat as a, cleanColl as c, deepEqual as d, isEmptyColl as i, mapColl as m, reduceColl as r, shallowEqual as s, unset as u };
//# sourceMappingURL=shallowEqual-5ac48ff3.js.map
