import { i as isArr } from './isArr-a4420764.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import { i as isStr } from './isStr-481ce69b.js';
import { i as isColl } from './isColl-15a1452b.js';
export { i as isColl } from './isColl-15a1452b.js';
import { u as updateColl, g as get } from './get-e0378510.js';
export { g as get } from './get-e0378510.js';
import { d as deepClone } from './deepClone-c429ffa5.js';
export { c as cloneObjWithPrototypeAndProperties, d as deepClone, s as set } from './deepClone-c429ffa5.js';
import './cloneFunc-1aaa9008.js';

const cleanColl = (coll, recursive = true) => {
  return isColl(coll) && Object.keys(coll).reduce((cleaned, key) => {
    const value = coll[key];
    if (value === null || value === undefined) return cleaned;
    cleaned[key] = recursive && isColl(value) ? cleanColl(value) : value;
    return cleaned;
  }, isObj(coll) && {} || []) || coll;
};

const isEmptyColl = obj => isArr(obj) ? obj.length === 0 : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;

const mapColl = (coll, cb) => isFunc(cb) && isColl(coll) ? Object.keys(coll).map(key => cb(key, coll[key], coll)) : isArr(coll) ? [] : {};

const reduceColl = (coll, cb, reduce) => isFunc(cb) && isColl(coll) ? Object.keys(coll).reduce((data, key) => cb(key, coll[key], coll, data), reduce) : isArr(coll) ? [] : {};

const unset = (obj, path) => updateColl(obj, path, 'unset');

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

export { cleanColl, isEmptyColl, mapColl, reduceColl, repeat, shallowEqual, unset };
