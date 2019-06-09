"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unset = exports.set = exports.reduceColl = exports.mapColl = exports.isColl = exports.get = void 0;

var _method = require("./method");

var _array = require("./array");

var _object = require("./object");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Updates a collection by removing, getting, adding to it
 * @param  { object } obj - object to update
 * @param  { string | array } path - path to the property to update
 * @param  { any } type - value to update || type
 * @return { any } based on update method
 */
var updateColl = function updateColl(obj, path, type, val) {
  var org = obj;
  if (!isColl(obj) || !obj || !path) return undefined;
  var parts = Array.isArray(path) ? path : path.split('.');
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
  ? obj[key] : type === 'unset' // Unset, return if the key was removed
  ? delete obj[key] : // Set, updated object
  (obj[key] = val) && org || org;
};
/**
 * Searches an object based on the path param
 * i.e. path = 'data.foo.bar' => will return obj.data.foo.bar
 * If bar does not exist, then will return obj.data.foo
 * @param  { object } obj - will search the object based on the path
 * @param  { string || array } path - . separated string to search the object
 * @return the final value found from the path
 */


var get = function get(obj, path) {
  return updateColl(obj, path, 'get');
};
/**
 * Checks if the value is a collection ( object || array )
 * @param  { any } val - value to check
 * @return { boolean } T/F if the value is a collection
 */


exports.get = get;

var isColl = function isColl(val) {
  return _typeof(val) === 'object' && val !== null;
};
/**
 * Loops over a collection and calls a passed in function for each one
 * @param  { collection } - collection to loop over
 * @return { array | object } returns the same type of collection passed in
 */


exports.isColl = isColl;

var mapColl = function mapColl(coll, cb) {
  var isAnArray = (0, _array.isArr)(coll);
  var mapped = (0, _method.isFunc)(cb) && isColl(coll) ? Object.keys(coll).map(function (key) {
    return cb(key, coll[key], coll);
  }) : isAnArray ? [] : {};
  return isAnArray && mapped || (0, _object.toObj)(mapped);
};
/**
 * Loops over collection and calling reduce
 * @param  { object } obj - object loop over
 * @param  { function } path - path that should be created on the object, separated by .
 * @param  { any } reduce - starting data passed to reduce method
 * @return {  } - last returned data from the loop
 */


exports.mapColl = mapColl;

var reduceColl = function reduceColl(coll, cb, reduce) {
  return (0, _method.isFunc)(cb) && isColl(coll) ? Object.keys(coll).reduce(function (data, key) {
    return cb(key, coll[key], coll, data);
  }, reduce) : Array.isArray(coll) ? [] : {};
};
/**
 * Adds a path to an object.
 * If the path already exists, but not in the correct format it will be replaced
 * path is built from a . separated string
 * i.e. path = 'data.foo.bar' => obj.data.foo.bar will be created on the object
 * @param  { object } obj - object to have the path added to it
 * @param  { string || array } path - path that should be created on the object, separated by .
 * @param  { any } finalValue - when ever the final value of the path should be
 * @return { object } the obj param
 */


exports.reduceColl = reduceColl;

var set = function set(obj, path, val) {
  return updateColl(obj, path, 'set', val);
};
/**
 * Removes a path from an object
 * @param  { object } obj - object to have the attribute removed
 * @param  { string || array } path - path of attribute to be removed, separated by string
 * @return the passed in object, with the attribute found at the path removed
 */


exports.set = set;

var unset = function unset(obj, path) {
  return updateColl(obj, path, 'unset');
};

exports.unset = unset;