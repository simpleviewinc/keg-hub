/** @module collection */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepClone = exports.unset = exports.set = exports.reduceColl = exports.mapColl = exports.isEmptyColl = exports.isColl = exports.get = void 0;

var _method = require("./method");

var _array = require("./array");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Updates a collection by removing, getting, adding to it.
 * @memberof collection
 * @param {Object} obj - object to update
 * @param {string|array} path - path to the property to update
 * @param {*} type - value to update || type
 * @return {*} based on update method
 */
const updateColl = (obj, path, type, val) => {
  const org = obj;
  if (!isColl(obj) || !obj || !path) return undefined;
  const parts = (0, _array.isArr)(path) ? path : path.split('.');
  const key = parts.pop();
  let prop;
  let breakPath;

  while (prop = parts.shift()) {
    isColl(obj[prop]) ? obj = obj[prop] : (() => {
      if (type !== 'set') breakPath = true;
      obj[prop] = {};
      obj = obj[prop];
    })();
    if (breakPath) return;
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
 * Recursively clones am object or array.
  * @example
 * const test = { foo: [ { bar: 'baz' } ] }
 * const clone = deepClone(test)
 * console.log(test === clone)) // prints false
 * console.log(test.foo === clone.foo) // prints false
 * @example
 * // Works with array too
 * deepClone([ [ [ 0 ] ] ])
 * // Returns copy of the passed in collection item
 * @param {Object} obj - object to clone
 * @return {Object} - cloned Object
 */


exports.unset = unset;

const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj;
  if (obj instanceof Set) return new Set(obj);
  if (hash.has(obj)) return hash.get(obj);
  const result = obj instanceof Date ? new Date(obj) : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) : !obj.constructor ? Object.create(null) : null; // if result is null, object has a constructor and wasn't an instance of Date nor RegExp

  if (result === null) {
    return cloneObjWithPrototypeAndProperties(obj);
  }

  hash.set(obj, result);
  if (obj instanceof Map) return Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)));
  return _extends(result, ...Object.keys(obj).map(key => ({
    [key]: deepClone(obj[key], hash)
  })));
};
/**
 * Helper for deepClone. Deeply clones the object, including its properties, and preserves the prototype and isFrozen state
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
  return Object.isFrozen(objectWithPrototype) ? Object.freeze(clone) : clone;
};