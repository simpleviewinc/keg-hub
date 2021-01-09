'use strict';

var isArr = require('./isArr-39234014.js');
var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');
var isStr = require('./isStr-8a57710e.js');
var isNum = require('./isNum-c7164b50.js');
var isColl = require('./isColl-5757310a.js');
var get = require('./get-bfcf4646.js');
var deepClone = require('./deepClone-2b548986.js');

const cleanColl = (coll, recursive = true) => {
  return isColl.isColl(coll) ? Object.keys(coll).reduce((cleaned, key) => {
    const value = coll[key];
    if (value === null || value === undefined) return cleaned;
    cleaned[key] = recursive && isColl.isColl(value) ? cleanColl(value) : value;
    return cleaned;
  }, isObj.isObj(coll) && {} || []) : console.error(`cleanColl requires a collection as the first argument`) || coll;
};

const isEmptyColl = obj => isArr.isArr(obj) ? obj.length === 0 : isColl.isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;

const mapColl = (coll, cb) => isFunc.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).map(key => cb(key, coll[key], coll)) : isArr.isArr(coll) ? [] : {};

const reduceColl = (coll, cb, reduce) => isFunc.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).reduce((data, key) => cb(key, coll[key], coll, data), reduce) : isArr.isArr(coll) ? [] : {};

const unset = (obj, path) => get.updateColl(obj, path, 'unset');

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
  if (!isNum.isNum(times)) {
    console.error("Times argument must be a number");
    return [];
  }
  const arr = [];
  for (let i = 0; i < times; i++) {
    const value = isFunc.isFunc(element) ? element() : cloneDeep ? deepClone.deepClone(element) : element;
    arr.push(value);
  }
  return arr;
};

const shallowEqual = (col1, col2, path) => {
  if (path && (isArr.isArr(path) || isStr.isStr(path))) {
    col1 = get.get(col1, path);
    col2 = get.get(col2, path);
  }
  if (col1 === col2) return true;
  if (!col1 || !isColl.isColl(col1) || !col2 || !isColl.isColl(col2)) return false;
  if (Object.keys(col1).length !== Object.keys(col2).length) return false;
  for (const key in col1) if (col1[key] !== col2[key]) return false;
  return true;
};

exports.cleanColl = cleanColl;
exports.deepEqual = deepEqual;
exports.isEmptyColl = isEmptyColl;
exports.mapColl = mapColl;
exports.reduceColl = reduceColl;
exports.repeat = repeat;
exports.shallowEqual = shallowEqual;
exports.unset = unset;
//# sourceMappingURL=shallowEqual-946ec12f.js.map
