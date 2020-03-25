import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';

const promisify = method => {
  if (!isFunc(method)) throw `Argument must be a function`;
  return (...args) => {
    return new Promise((res, rej) => {
      if (!isFunc(args[args.length - 1])) return res(method(...args));
      args.pop();
      args.push((...cbData) => {
        return cbData && cbData[0] ? rej(...cbData) : res(...cbData);
      });
      return method(...args);
    });
  };
};

const defObjProps = Array.from(['caller', 'callee', 'arguments', 'apply', 'bind', 'call', 'toString', '__proto__', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'valueOf', 'toLocaleString']).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((map, functionName) => {
  map[functionName] = true;
  return map;
}, {});
const addAsync = object => {
  if (!object.__IS_PROMISIFIED__) {
    for (const prop of Object.getOwnPropertyNames(object)) {
      const isAsync = prop.indexOf('Async') !== -1 || object[`${prop}Async`];
      if (isAsync || defObjProps[prop]) continue;
      if (isFunc(object[prop])) object[`${prop}Async`] = promisify(object[prop]);else {
        const getValue = Object.getOwnPropertyDescriptor(object, prop).get;
        if (isFunc(getValue)) object[`${prop}Async`] = promisify(getValue);
      }
    }
    object.__IS_PROMISIFIED__ = true;
  }
  return object;
};
const promisifyAll = object => {
  if (!isObj(object)) return object;
  addAsync(object);
  const proto = Object.getPrototypeOf(object);
  proto && Object.getPrototypeOf(proto) !== null && addAsync(proto);
  return object;
};

const wait = time => new Promise((res, rej) => setTimeout(() => res(true), time));

export { promisify, promisifyAll, wait };
