/** @module collection */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-names");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmptyCollection = exports.unset = exports.set = exports.reduceColl = exports.mapColl = exports.isColl = exports.get = void 0;

var _method = require("./method");

var _array = require("./array");

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
 * Loops over a collection and calls a passed in function for each one.
 * @example
 * mapColl([1, 2, 3], (key, val, coll) => { console.log(key) })
 * // Will log all keys of the collection
 * @function
 * @param {Array|Object} - collection to loop over
 * @return {Array|Object} returns the same type of collection passed in
 */


exports.isColl = isColl;

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
 * Checks if passed in obj is empty.
 * @example
 * isEmptyCollection({})
 * // Returns true
 * @example
 * isEmptyCollection({ foo: 'bar' })
 * // Returns false
 * @function
 * @param {Object} obj - object to check if empty
 * @return {boolean}  true || false
 */


exports.unset = unset;

var isEmptyCollection = function isEmptyCollection(obj) {
  return (0, _array.isArr)(obj) ? obj.length === 0 : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0;
};

exports.isEmptyCollection = isEmptyCollection;