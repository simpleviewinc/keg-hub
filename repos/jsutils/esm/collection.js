/** @module collection */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-own-property-names");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.is-frozen");

require("core-js/modules/es.object.is-sealed");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.seal");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.flags");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.repeat");

require("core-js/modules/es.string.split");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowEqual = exports.repeat = exports.deepClone = exports.unset = exports.set = exports.reduceColl = exports.mapColl = exports.isEmptyColl = exports.isColl = exports.get = void 0;

var _method = require("./method");

var _array = require("./array");

var _number = require("./number");

var _string = require("./string");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var updateColl = function updateColl(obj, path, type, val) {
  var org = obj;
  if (!isColl(obj) || !obj || !path) return type !== 'set' && val || undefined; // cloneDeep so we don't modify the reference

  var parts = (0, _array.isArr)(path) ? Array.from(path) : path.split('.');
  var key = parts.pop();
  var prop;
  var breakPath;

  var _loop = function _loop() {
    var next = obj[prop];
    isColl(next) || (0, _method.isFunc)(next) ? obj = next : function () {
      if (type === 'set') obj[prop] = {};else breakPath = true;
      obj = next;
    }();
    if (breakPath) return {
      v: val
    };
  };

  while (prop = parts.shift()) {
    var _ret = _loop();

    if (_typeof(_ret) === "object") return _ret.v;
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


var get = function get(obj, path, fallback) {
  return updateColl(obj, path, 'get', fallback);
};
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

var isColl = function isColl(val) {
  return _typeof(val) === 'object' && val !== null;
};
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

var isEmptyColl = function isEmptyColl(obj) {
  return (0, _array.isArr)(obj) ? obj.length === 0 : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
};
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

var mapColl = function mapColl(coll, cb) {
  return (0, _method.isFunc)(cb) && isColl(coll) ? Object.keys(coll).map(function (key) {
    return cb(key, coll[key], coll);
  }) : (0, _array.isArr)(coll) ? [] : {};
};
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

var reduceColl = function reduceColl(coll, cb, reduce) {
  return (0, _method.isFunc)(cb) && isColl(coll) ? Object.keys(coll).reduce(function (data, key) {
    return cb(key, coll[key], coll, data);
  }, reduce) : (0, _array.isArr)(coll) ? [] : {};
};
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

var set = function set(obj, path, val) {
  return updateColl(obj, path, 'set', val);
};
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

var unset = function unset(obj, path) {
  return updateColl(obj, path, 'unset');
};
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

var deepClone = function deepClone(obj) {
  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (Object(obj) !== obj) return obj;
  if (obj instanceof Set) return new Set(obj);
  if (hash.has(obj)) return hash.get(obj);
  if ((0, _array.isArr)(obj)) return obj.map(function (x) {
    return deepClone(x);
  });
  if ((0, _method.isFunc)(obj)) return (0, _method.cloneFunc)(obj);
  var result = obj instanceof Date ? new Date(obj) : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) : !obj.constructor ? Object.create(null) : null; // if result is null, object has a constructor and wasn't an instance of Date nor RegExp

  if (result === null) return cloneObjWithPrototypeAndProperties(obj);
  hash.set(obj, result);
  if (obj instanceof Map) return Array.from(obj, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return result.set(key, deepClone(val, hash));
  });
  return _extends.apply(void 0, [result].concat(_toConsumableArray(Object.keys(obj).map(function (key) {
    return _defineProperty({}, key, deepClone(obj[key], hash));
  }))));
};
/**
 * Helper for deepClone. Deeply clones the object, including its properties, and preserves the prototype and isFrozen and isSealed state
 * @function
 * @param {Object} objectWithPrototype - any object that has a prototype
 * @returns {Object} the cloned object 
 */


exports.deepClone = deepClone;

var cloneObjWithPrototypeAndProperties = function cloneObjWithPrototypeAndProperties(objectWithPrototype) {
  if (!objectWithPrototype) return objectWithPrototype;
  var prototype = Object.getPrototypeOf(objectWithPrototype);
  var sourceDescriptors = Object.getOwnPropertyDescriptors(objectWithPrototype);

  for (var _i2 = 0, _Object$entries = Object.entries(sourceDescriptors); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        key = _Object$entries$_i[0],
        descriptor = _Object$entries$_i[1];

    sourceDescriptors[key].value = deepClone(descriptor.value);
  }

  var clone = Object.create(prototype, sourceDescriptors);
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


var repeat = function repeat(element, times) {
  var cloneDeep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!times || times <= 0) return [];

  if (!(0, _number.isNum)(times)) {
    console.error("Times argument must be a number");
    return [];
  }

  var arr = [];

  for (var i = 0; i < times; i++) {
    var value = (0, _method.isFunc)(element) ? element() : cloneDeep ? deepClone(element) : element;
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

var shallowEqual = function shallowEqual(col1, col2, path) {
  // If a path is passed in, update the collections to be that path
  if (path && ((0, _array.isArr)(path) || (0, _string.isStr)(path))) {
    col1 = get(col1, path);
    col2 = get(col2, path);
  } // If the objects are the same, so return true


  if (col1 === col2) return true; // Ensure the objects exist, and they have keys we can compare

  if (_typeof(col1) !== "object" || !col1 || _typeof(col2) !== "object" || !col2) return false; // If they have different key lengths, then they are not equal

  if (Object.keys(col1).length !== Object.keys(col2).length) return false; // Loop the keys, and ensure the other collection has the key and it's value is the same

  for (var key in col1) {
    if (col1[key] !== col2[key]) return false;
  } // Keys and values are equal, so return true


  return true;
};

exports.shallowEqual = shallowEqual;