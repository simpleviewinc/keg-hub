/** @module collection */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowEqual = exports.repeat = exports.deepClone = exports.unset = exports.set = exports.reduceColl = exports.mapColl = exports.isEmptyColl = exports.isColl = exports.get = void 0;

var _method = require("./method");

var _array = require("./array");

var _number = require("./number");

var _string = require("./string");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const updateColl = (obj, path, type, val) => {
  const org = obj;
  if (!isColl(obj) || !obj || !path) return type !== 'set' && val || undefined; // cloneDeep so we don't modify the reference

  const parts = (0, _array.isArr)(path) ? Array.from(path) : path.split('.');
  const key = parts.pop();
  let prop;
  let breakPath;

  while (prop = parts.shift()) {
    const next = obj[prop];
    isColl(next) || (0, _method.isFunc)(next) ? obj = next : (() => {
      if (type === 'set') obj[prop] = {};else breakPath = true;
      obj = next;
    })();
    if (breakPath) return val;
  }

  return type === 'get' // Get return the value
  ? key in obj ? obj[key] : val : type === 'unset' // Unset, return if the key was removed
  ? delete obj[key] : // Set, updated object
  (obj[key] = val) && org || org;
};
/**
 * Searches an object based on the path param
 * <br> I.E. path = 'data.foo.bar' => will return obj.data.foo.bar.
 * <br> If bar does not exist, then will return obj.data.foo
 * @example
 * get(obj, 'data.foo.bar')
 * // Returns the value of bar
 * @example
 * get(obj, ['data', 'foo', 'bar'])
 * // Returns the value of bar
 * @function
 * @param {Object} obj - will search the object based on the path
 * @param {string|array} path - . separated string to search the object
 * @return the final value found from the path
 */


const get = (obj, path, fallback) => updateColl(obj, path, 'get', fallback);
/**
 * Checks if the value is a collection ( object || array ).
 * @example
 * isColl([1,2,3])
 * // Returns true
 * @example
 * isColl({ foo: 'bar' })
 * // Returns true
 * @example
 * isColl(null)
 * // Returns false
 * @function
 * @param {*} val - value to check
 * @return {boolean} T/F if the value is a collection
 */


exports.get = get;

const isColl = val => typeof val === 'object' && val !== null;
/**
 * Checks if passed in obj || array is empty.
 * @example
 * isEmptyColl({})
 * // Returns true
 * @example
 * isEmptyColl({ foo: 'bar' })
 * // Returns false
 * @example
 * isEmptyColl([])
 * // Returns true
 * @function
 * @param {Object} obj - object to check if empty
 * @return {boolean}  true || false
 */


exports.isColl = isColl;

const isEmptyColl = obj => (0, _array.isArr)(obj) ? obj.length === 0 : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
/**
 * Loops over a collection and calls a passed in function for each one.
 * @example
 * mapColl([1, 2, 3], (key, val, coll) => { console.log(key) })
 * // Will log all keys of the collection
 * @function
 * @param {Array|Object} - collection to loop over
 * @return {Array|Object} returns the same type of collection passed in
 */


exports.isEmptyColl = isEmptyColl;

const mapColl = (coll, cb) => (0, _method.isFunc)(cb) && isColl(coll) ? Object.keys(coll).map(key => cb(key, coll[key], coll)) : (0, _array.isArr)(coll) ? [] : {};
/**
 * Loops over collection and calls reduce.
 * @example
 * reduceColl([1, 2, 3], (key, val, coll) => { console.log(key) }, {})
 * // Returns what ever is returned from the last iteration of the reduce loop
 * @function
 * @param {Object} obj - object loop over
 * @param {function} path - path that should be created on the object, separated by .
 * @param {*} reduce - starting data passed to reduce method
 * @return {Object} - last returned data from the loop
 */


exports.mapColl = mapColl;

const reduceColl = (coll, cb, reduce) => (0, _method.isFunc)(cb) && isColl(coll) ? Object.keys(coll).reduce((data, key) => cb(key, coll[key], coll, data), reduce) : (0, _array.isArr)(coll) ? [] : {};
/**
 * Adds a path to an object.
 * <br> If the path already exists, but not in the correct format it will be replaced.
 * <br> The path is built from a `.` separated string.
 * <br> I.E. path = 'data.foo.bar' => obj.data.foo.bar will be created on the object.
 * @example
 * set(obj, [ 'foo', 'bar' ], 'baz')
 * // Returns the passed in obj, with the value of bar set to baz
 * @example
 * set(obj, 'foo.bar', 'baz')
 * // Returns the passed in obj, with the value of bar set to baz
 * @function
 * @param {Object} obj - object to have the path added to it
 * @param {string|array} path - path that should be created on the object, separated by .
 * @param {*} finalValue - when ever the final value of the path should be
 * @return {Object} the obj param
 */


exports.reduceColl = reduceColl;

const set = (obj, path, val) => updateColl(obj, path, 'set', val);
/**
 * Removes a path from an object.
 * @example
 * unset(obj, 'foo.bar')
 * // Returns the passed in obj, with the value of bar set to undefined
 * @function
 * @param {Object} obj - object to have the attribute removed
 * @param {string|array} path - path of attribute to be removed, separated by string
 * @return the passed in object, with the attribute found at the path removed
 */


exports.set = set;

const unset = (obj, path) => updateColl(obj, path, 'unset');
/**
 * Recursively clones an object or array.
  * @example
 * const test = { foo: [ { bar: 'baz' } ] }
 * const clone = deepClone(test)
 * console.log(test === clone)) // prints false
 * console.log(test.foo === clone.foo) // prints false
 * @example
 * // Works with array too
 * deepClone([ [ [ 0 ] ] ])
 * // Returns copy of the passed in collection item
 * @function
 * @param {Object} obj - object to clone
 * @return {Object} - cloned Object
 */


exports.unset = unset;

const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj;
  if (obj instanceof Set) return new Set(obj);
  if (hash.has(obj)) return hash.get(obj);
  if ((0, _array.isArr)(obj)) return obj.map(x => deepClone(x));
  if ((0, _method.isFunc)(obj)) return (0, _method.cloneFunc)(obj);
  const result = obj instanceof Date ? new Date(obj) : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) : !obj.constructor ? Object.create(null) : null; // if result is null, object has a constructor and wasn't an instance of Date nor RegExp

  if (result === null) return cloneObjWithPrototypeAndProperties(obj);
  hash.set(obj, result);
  if (obj instanceof Map) return Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)));
  return _extends(result, ...Object.keys(obj).map(key => ({
    [key]: deepClone(obj[key], hash)
  })));
};
/**
 * Helper for deepClone. Deeply clones the object, including its properties, and preserves the prototype and isFrozen and isSealed state
 * @function
 * @param {Object} objectWithPrototype - any object that has a prototype
 * @returns {Object} the cloned object 
 */


exports.deepClone = deepClone;

const cloneObjWithPrototypeAndProperties = objectWithPrototype => {
  if (!objectWithPrototype) return objectWithPrototype;
  const prototype = Object.getPrototypeOf(objectWithPrototype);
  const sourceDescriptors = Object.getOwnPropertyDescriptors(objectWithPrototype);

  for (var _i = 0, _Object$entries = Object.entries(sourceDescriptors); _i < _Object$entries.length; _i++) {
    const _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          descriptor = _Object$entries$_i[1];

    sourceDescriptors[key].value = deepClone(descriptor.value);
  }

  const clone = Object.create(prototype, sourceDescriptors);
  if (Object.isFrozen(objectWithPrototype)) Object.freeze(clone);
  if (Object.isSealed(objectWithPrototype)) Object.seal(clone);
  return clone;
};
/**
 * Returns an array composed of element repeated "times" times. If element is a function, it will be called.
 * <br> Note: if you simply want to run a function some number of times, without returning an array of its results, @see Method.doIt
 * @param {*} element - a value or a function. If it is a function, repeat will call it each repeated time
 * @param {number} times - number of times that element should be included/called for the resulting array. Anything less than or equal to 0, or not a number, will return an empty array.
 * @function
 * @param {boolean} cloneDeep - if true, it will deeply clone the element for every instance in the resulting array 
 * @returns an array of repeated elements or results from the function call
 * @example repeat(1, 3) // returns [1, 1, 1]
 * @example repeat(() => 2 * 2, 3) // returns [4, 4, 4]
 */


const repeat = (element, times, cloneDeep = false) => {
  if (!times || times <= 0) return [];

  if (!(0, _number.isNum)(times)) {
    console.error("Times argument must be a number");
    return [];
  }

  const arr = [];

  for (let i = 0; i < times; i++) {
    const value = (0, _method.isFunc)(element) ? element() : cloneDeep ? deepClone(element) : element;
    arr.push(value);
  }

  return arr;
};
/**
 * Compares a collection's keys / values with another collections keys / values
 * @example
 * shallowEqual({ foo: 'bar' }, { foo: 'bar' })
 * // Returns true
 * @example
 * shallowEqual({ foo: 'bar', baz: {} }, { foo: 'bar', baz: {} })
 * // Returns false, because the baz values are different objects
 * @example
 * // Works with array too
 * shallowEqual([ 1, 2 ], [ 1, 2 ])
 * // Returns true
 * @example
 * shallowEqual([{ foo: 'bar' }], [{ foo: 'bar' }])
 * // Returns false, because the objects in index 0 are different
 * @example
 * // Pass a path to compare instead of the root
 * shallowEqual({ foo: { bar: { baz: 'biz' }}}, { foo: { bar: { baz: 'biz' }}}, 'foo.bar')
 * // Returns true, because the bar object is compared
 * @function
 * @param {Object|Array} col1 - Collection to compare
 * @param {Object|Array} col2 - Collection to compare
 * @param {Array|string} path - path of object to compare. Uses the get method to find the path
 *
 * @returns {boolean} - true or false if the objects keys values are equal
 */


exports.repeat = repeat;

const shallowEqual = (col1, col2, path) => {
  // If a path is passed in, update the collections to be that path
  if (path && ((0, _array.isArr)(path) || (0, _string.isStr)(path))) {
    col1 = get(col1, path);
    col2 = get(col2, path);
  } // If the objects are the same, so return true


  if (col1 === col2) return true; // Ensure the objects exist, and they have keys we can compare

  if (typeof col1 !== "object" || !col1 || typeof col2 !== "object" || !col2) return false; // If they have different key lengths, then they are not equal

  if (Object.keys(col1).length !== Object.keys(col2).length) return false; // Loop the keys, and ensure the other collection has the key and it's value is the same

  for (const key in col1) if (col1[key] !== col2[key]) return false; // Keys and values are equal, so return true


  return true;
};

exports.shallowEqual = shallowEqual;