'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isArr = require('./isArr-39234014.js');
var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');
var isNum = require('./isNum-c7164b50.js');
var isStr = require('./isStr-8a57710e.js');
var isColl = require('./isColl-5757310a.js');
var get = require('./get-711365f4.js');
var deepClone = require('./deepClone-24b52c1a.js');
require('./cloneFunc-6f1b4c75.js');

const cleanColl = (coll, recursive = true) => {
  return isColl.isColl(coll) && Object.keys(coll).reduce((cleaned, key) => {
    const value = coll[key];
    if (value === null || value === undefined) return cleaned;
    cleaned[key] = recursive && isColl.isColl(value) ? cleanColl(value) : value;
    return cleaned;
  }, isObj.isObj(coll) && {} || []) || coll;
};

const isEmptyColl = obj => isArr.isArr(obj) ? obj.length === 0 : isColl.isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;

const mapColl = (coll, cb) => isFunc.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).map(key => cb(key, coll[key], coll)) : isArr.isArr(coll) ? [] : {};

const reduceColl = (coll, cb, reduce) => isFunc.isFunc(cb) && isColl.isColl(coll) ? Object.keys(coll).reduce((data, key) => cb(key, coll[key], coll, data), reduce) : isArr.isArr(coll) ? [] : {};

const unset = (obj, path) => get.updateColl(obj, path, 'unset');

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

exports.isColl = isColl.isColl;
exports.get = get.get;
exports.cloneObjWithPrototypeAndProperties = deepClone.cloneObjWithPrototypeAndProperties;
exports.deepClone = deepClone.deepClone;
exports.set = deepClone.set;
exports.cleanColl = cleanColl;
exports.isEmptyColl = isEmptyColl;
exports.mapColl = mapColl;
exports.reduceColl = reduceColl;
exports.repeat = repeat;
exports.shallowEqual = shallowEqual;
exports.unset = unset;
