import { i as isFunc } from './isFunc-40ceeef8.js';
import { g as get } from './get-c06a1288.js';
import { i as isArr } from './isArr-a4420764.js';

const cloneFunc = func => {
  const funcClone = function (...args) {
    return func instanceof funcClone ? (() => {
      return new func(...args);
    })() : get(func.prototype, 'constructor.name') ? new func(...args) : func.apply(func, args);
  };
  for (let key in func) func.hasOwnProperty(key) && (funcClone[key] = func[key]);
  Object.defineProperty(funcClone, 'name', {
    value: func.name,
    configurable: true
  });
  funcClone.toString = () => func.toString();
  return funcClone;
};

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

export { cloneFunc as a, cloneObjWithPrototypeAndProperties as c, deepClone as d };
//# sourceMappingURL=deepClone-bbe59305.js.map
