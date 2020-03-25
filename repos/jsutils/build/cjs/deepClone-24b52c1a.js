'use strict';

var isArr = require('./isArr-39234014.js');
var isFunc = require('./isFunc-f93803cb.js');
var get = require('./get-711365f4.js');
var cloneFunc = require('./cloneFunc-6f1b4c75.js');

const set = (obj, path, val) => get.updateColl(obj, path, 'set', val);

const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj;
  if (obj instanceof Set) return new Set(obj);
  if (hash.has(obj)) return hash.get(obj);
  if (isArr.isArr(obj)) return obj.map(x => deepClone(x));
  if (isFunc.isFunc(obj)) return cloneFunc.cloneFunc(obj);
  const result = obj instanceof Date ? new Date(obj) : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) : !obj.constructor ? Object.create(null) : null;
  if (result === null) return cloneObjWithPrototypeAndProperties(obj);
  hash.set(obj, result);
  if (obj instanceof Map) return Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)));
  return Object.assign(result, ...Object.keys(obj).map(key => ({
    [key]: deepClone(obj[key], hash)
  })));
};
const cloneObjWithPrototypeAndProperties = objectWithPrototype => {
  if (!objectWithPrototype) return objectWithPrototype;
  const prototype = Object.getPrototypeOf(objectWithPrototype);
  const sourceDescriptors = Object.getOwnPropertyDescriptors(objectWithPrototype);
  for (const [key, descriptor] of Object.entries(sourceDescriptors)) {
    descriptor.value && (sourceDescriptors[key].value = deepClone(descriptor.value));
  }
  const clone = Object.create(prototype, sourceDescriptors);
  if (Object.isFrozen(objectWithPrototype)) Object.freeze(clone);
  if (Object.isSealed(objectWithPrototype)) Object.seal(clone);
  return clone;
};

exports.cloneObjWithPrototypeAndProperties = cloneObjWithPrototypeAndProperties;
exports.deepClone = deepClone;
exports.set = set;
