"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unset = exports.set = exports.reduceColl = exports.mapColl = exports.isColl = exports.get = void 0;

var _method = require("./method");

var _array = require("./array");

/**
 * Updates a collection by removing, getting, adding to it
 * @param  { object } obj - object to update
 * @param  { string | array } path - path to the property to update
 * @param  { any } type - value to update || type
 * @return { any } based on update method
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
 * i.e. path = 'data.foo.bar' => will return obj.data.foo.bar
 * If bar does not exist, then will return obj.data.foo
 * @param  { object } obj - will search the object based on the path
 * @param  { string || array } path - . separated string to search the object
 * @return the final value found from the path
 */


const get = (obj, path, fallback) => updateColl(obj, path, 'get', fallback);
/**
 * Checks if the value is a collection ( object || array )
 * @param  { any } val - value to check
 * @return { boolean } T/F if the value is a collection
 */


exports.get = get;

const isColl = val => typeof val === 'object' && val !== null;
/**
 * Loops over a collection and calls a passed in function for each one
 * @param  { collection } - collection to loop over
 * @return { array | object } returns the same type of collection passed in
 */


exports.isColl = isColl;

const mapColl = (coll, cb) => (0, _method.isFunc)(cb) && isColl(coll) ? Object.keys(coll).map(key => cb(key, coll[key], coll)) : isAnArray ? [] : {};
/**
 * Loops over collection and calling reduce
 * @param  { object } obj - object loop over
 * @param  { function } path - path that should be created on the object, separated by .
 * @param  { any } reduce - starting data passed to reduce method
 * @return {  } - last returned data from the loop
 */


exports.mapColl = mapColl;

const reduceColl = (coll, cb, reduce) => (0, _method.isFunc)(cb) && isColl(coll) ? Object.keys(coll).reduce((data, key) => cb(key, coll[key], coll, data), reduce) : (0, _array.isArr)(coll) ? [] : {};
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

const set = (obj, path, val) => updateColl(obj, path, 'set', val);
/**
 * Removes a path from an object
 * @param  { object } obj - object to have the attribute removed
 * @param  { string || array } path - path of attribute to be removed, separated by string
 * @return the passed in object, with the attribute found at the path removed
 */


exports.set = set;

const unset = (obj, path) => updateColl(obj, path, 'unset');

exports.unset = unset;