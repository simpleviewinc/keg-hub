'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');

const promisify = method => {
  if (!isFunc.isFunc(method)) throw `Argument must be a function`;
  return (...args) => {
    return new Promise((res, rej) => {
      if (!isFunc.isFunc(args[args.length - 1])) return res(method(...args));
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
      if (isFunc.isFunc(object[prop])) object[`${prop}Async`] = promisify(object[prop]);else {
        const getValue = Object.getOwnPropertyDescriptor(object, prop).get;
        if (isFunc.isFunc(getValue)) object[`${prop}Async`] = promisify(getValue);
      }
    }
    object.__IS_PROMISIFIED__ = true;
  }
  return object;
};
const promisifyAll = object => {
  if (!isObj.isObj(object)) return object;
  addAsync(object);
  const proto = Object.getPrototypeOf(object);
  proto && Object.getPrototypeOf(proto) !== null && addAsync(proto);
  return object;
};

const wait = time => new Promise((res, rej) => setTimeout(() => res(true), time));

exports.promisify = promisify;
exports.promisifyAll = promisifyAll;
exports.wait = wait;
