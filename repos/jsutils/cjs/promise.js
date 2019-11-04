/** @module promise */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = exports.promisifyAll = exports.promisify = void 0;

var _object = require("./object");

var _method = require("./method");

const promisify = method => {
  if (!(0, _method.isFunc)(method)) throw `Argument must be a function`;
  return (...args) => {
    return new Promise((res, rej) => {
      // If the last arg is not a function, just return the resolved method
      if (!(0, _method.isFunc)(args[args.length - 1])) return res(method(...args)); // Remove the callback method

      args.pop(); // Replace it with the promise resolve / reject

      args.push((...cbData) => {
        // If the cbData first arg is not falsy, then reject the promise
        // Otherwise resolve it
        return cbData && cbData[0] ? rej(...cbData) : res(...cbData);
      }); // Call the method, and return it

      return method(...args);
    });
  };
};

exports.promisify = promisify;
const isTest = process.env.NODE_ENV === 'test';
/**
 * Creates an array of Object default properties not to convert into promises
 */

const defObjProps = Array.from(['caller', 'callee', 'arguments', 'apply', 'bind', 'call', 'toString', '__proto__', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', 'toLocaleString']).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((map, functionName) => {
  map[functionName] = true;
  return map;
}, {});
/**
 * Loops an object and looks for any methods that belong to the object, then add an Async version
 * @memberof promise
 * @param {Object} object
 * @return {Object} - object with Async methods added
 */

const addAsync = object => {
  if (!object.__IS_PROMISIFIED__) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.getOwnPropertyNames(object)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const prop = _step.value;
        const isAsync = prop.indexOf('Async') !== -1 || object[`${prop}Async`];
        if (isAsync || defObjProps[prop]) continue;
        if ((0, _method.isFunc)(object[prop])) object[`${prop}Async`] = promisify(object[prop]);else {
          const getValue = Object.getOwnPropertyDescriptor(object, prop).get;
          if ((0, _method.isFunc)(getValue)) object[`${prop}Async`] = promisify(getValue);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    object.__IS_PROMISIFIED__ = true;
  }

  return object;
};
/**
 * Converts Objects method properties into promiseAsync. allow using promisifyAll
 * @function
 * @param {Object} object
 * @return {Object} - promisified object
 */


const promisifyAll = object => {
  if (!(0, _object.isObj)(object)) return object;
  addAsync(object);
  const proto = Object.getPrototypeOf(object);
  proto && Object.getPrototypeOf(proto) !== null && addAsync(proto);
  return object;
};
/**
 * Stops execution for a given amount of time
 * @function
 * @param {number} time - Amount of time to wait
 * @return { void }
 */


exports.promisifyAll = promisifyAll;

const wait = time => new Promise((res, rej) => setTimeout(() => res(true), time));

exports.wait = wait;