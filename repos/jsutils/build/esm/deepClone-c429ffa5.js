import { i as isArr } from './isArr-a4420764.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { u as updateColl } from './get-e0378510.js';
import { c as cloneFunc } from './cloneFunc-1aaa9008.js';

const set = (obj, path, val) => updateColl(obj, path, 'set', val);

const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj;
  if (obj instanceof Set) return new Set(obj);
  if (hash.has(obj)) return hash.get(obj);
  if (isArr(obj)) return obj.map(x => deepClone(x));
  if (isFunc(obj)) return cloneFunc(obj);
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

export { cloneObjWithPrototypeAndProperties as c, deepClone as d, set as s };
