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

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.flags");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepClone = exports.unset = exports.set = exports.reduceColl = exports.mapColl = exports.isEmptyColl = exports.isColl = exports.get = void 0;

var _method = require("./method");

var _array = require("./array");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Updates a collection by removing, getting, adding to it.
 * @memberof collection
 * @param {Object} obj - object to update
 * @param {string|array} path - path to the property to update
 * @param {*} type - value to update || type
 * @return {*} based on update method
 */
var updateColl = function updateColl(obj, path, type, val) {
  var org = obj;
  if (!isColl(obj) || !obj || !path) return undefined;
  var parts = (0, _array.isArr)(path) ? path : path.split('.');
  var key = parts.pop();
  var prop;
  var breakPath;

  while (prop = parts.shift()) {
    isColl(obj[prop]) ? obj = obj[prop] : function () {
      if (type !== 'set') breakPath = true;
      obj[prop] = {};
      obj = obj[prop];
    }();
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

var deepClone = function deepClone(obj) {
  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (Object(obj) !== obj) return obj;
  if (obj instanceof Set) return new Set(obj);
  if (hash.has(obj)) return hash.get(obj);
  var result = obj instanceof Date ? new Date(obj) : obj instanceof RegExp ? new RegExp(obj.source, obj.flags) : !obj.constructor ? Object.create(null) : null; // if result is null, object has a constructor and wasn't an instance of Date nor RegExp

  if (result === null) {
    return cloneObjWithPrototypeAndProperties(obj);
  }

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
 * Helper for deepClone. Deeply clones the object, including its properties, and preserves the prototype and isFrozen state
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
  return Object.isFrozen(objectWithPrototype) ? Object.freeze(clone) : clone;
};