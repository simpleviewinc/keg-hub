/** @module object */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyMap = exports.toObj = exports.trimStringFields = exports.sanitizeCopy = exports.reduceObj = exports.pickKeys = exports.omitKeys = exports.mapObj = exports.jsonEqual = exports.isObj = exports.hasOwn = exports.applyToCloneOf = exports.deepMerge = exports.deepFreeze = exports.eitherObj = exports.clearObj = exports.cloneJson = void 0;

var _log = require("./log");

var _method = require("./method");

var _collection = require("./collection");

var _string = require("./string");

var _array = require("./array");

var _ext = require("./ext");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Clones an object by converting to JSON string and back.
 * @function
 * @param {Object} obj - object to clone
 * @returns {Object} copy of original object
 */
const cloneJson = obj => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    (0, _log.logData)(e.message, 'error');
    return null;
  }
};
/**
 * Removes all properties from an object.
 * @function
 * @param {Object} obj - object to remove properties from
 * @param {Array} filter - list of keys to not remove
 * @returns { null }
 */


exports.cloneJson = cloneJson;

const clearObj = (obj, filter) => {
  obj && Object.entries(obj).map(([key, value]) => {
    if (filter && filter.indexOf(key) !== -1) return;
    if (typeof value === 'object') clearObj(value);
    obj[key] = undefined;
    delete obj[key];
  });
};
/**
 * Returns the first param if correct type of second param.
 * @function
 * @param {Object} obj1 - return if is object
 * @param {Object} obj2 - use if first is not an object
 * @returns {Object}
 */


exports.clearObj = clearObj;

const eitherObj = (obj1, obj2) => isObj(obj1) && obj1 || obj2;
/**
 * Recursively freezes and object.
 * @function
 * @param {Object} obj
 * @return {Object} - frozen Object
 */


exports.eitherObj = eitherObj;

const deepFreeze = obj => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).map(prop => {
    obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === 'object' || (0, _method.isFunc)(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
  });
  return obj;
};
/**
 * Deep merges an array of objects together.
 * @function
 * @param {Array} sources - array of objects to join
 * @returns {Object|Array} - merged object or array
 */


exports.deepFreeze = deepFreeze;

const deepMerge = (...sources) => {
  return sources.reduce((merged, source) => source instanceof Array ? // Check if it's array, and join the arrays
  [...(merged instanceof Array && merged || []), ...source] : // Check if it's an object, and loop the properties
  source instanceof Object ? Object.entries(source) // Loop the entries of the object, and add them to the merged object
  .reduce((joined, [key, value]) => _objectSpread({}, joined, {
    [key]: // Check if the value is not a function and is an object
    // Also check if key is in the object
    // Set to value or deepMerge the object with the current merged object
    !(0, _method.isFunc)(value) && value instanceof Object && key in joined && // This will always return an object
    // So if it gets called then value is not getting set
    deepMerge(joined[key], value) || // Otherwise just set the value
    value
  }), // Pass in merged at the joined object
  merged) : // If it's not an array or object, just return the merge object
  merged, {});
};
/**
 * Deep clones Object obj, then returns the result of calling function mutatorCb with the clone as its argument
 * @example
 * const obj = {}
 * const clone = applyToCloneOf(obj, (clone) => { clone.test = 'foo'; return clone })
 * console.log(obj === clone) // prints false
 * console.log(clone.test === 'data') // prints true
 * @function
 * @param {Object} obj - object
 * @param {Function} mutatorCb - a callback that accepts one argument, the cloned obj, and mutates it in some way
 * @returns the mutated clone
 */


exports.deepMerge = deepMerge;

const applyToCloneOf = (obj, mutatorCb) => {
  let error;
  if (!obj) error = 'object (Argument 1) in applyToCloneOf, must be defined!';
  if (!isObj(obj)) error = 'object (Argument 1) in applyToCloneOf, must be an object!';
  if (!mutatorCb) error = 'mutator (Argument 2) in applyToCloneOf, must be defined!';
  if (!(0, _method.isFunc)(mutatorCb)) error = 'mutator (Argument 2) arg in applyToCloneOf, must be a function!';
  if (error) return console.warn(error) || obj;
  const clone = (0, _collection.deepClone)(obj);
  mutatorCb(clone);
  return clone;
};
/**
 * Checks if prop exists on the object.
 * @function
 * @param {Object} obj - data to check
 * @param {string} prop - prop to check for
 * @returns {boolean} T/F if the prop exists
 */


exports.applyToCloneOf = applyToCloneOf;

const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
/**
 * Checks if data is an object and not an array.
 * @function
 * @param {Object} obj - data to check
 * @returns {boolean}
 */


exports.hasOwn = hasOwn;

const isObj = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
/**
 * Compares two objects by converting to JSON, and checking string equality.
 * @function
 * @param { object | array } one - object to compare with param two
 * @param { object | array } two - object to compare with param one
 * @return {boolean} status of equality
 */


exports.isObj = isObj;

const jsonEqual = (one, two) => {
  try {
    return JSON.stringify(one) === JSON.stringify(two);
  } catch (e) {
    return false;
  }
};
/**
 * Map over and objects props and values.
 * @function
 * @param {Object} obj
 * @return {Array} -  returned values from callback
 */


exports.jsonEqual = jsonEqual;

const mapObj = (obj, cb) => isObj(obj) && (0, _method.isFunc)(cb) && Object.entries(obj).map(([key, value]) => cb(key, value)) || obj;
/**
 * Creates a new object from passed in object with keys not defined from array.
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to not add to new object
 * @return {Object} new object with only keys not in array
 */


exports.mapObj = mapObj;

const omitKeys = (obj = {}, keys = []) => isObj(obj) && reduceObj(obj, (key, _, updated) => {
  keys.indexOf(key) === -1 && (updated[key] = obj[key]);
  return updated;
}, {}) || {};
/**
 * Creates a new object from passed in object with keys defined from array.
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to add to new object
 * @return {Object} new object with only keys from passed in keys array
 */


exports.omitKeys = omitKeys;

const pickKeys = (obj = {}, keys = []) => isObj(obj) && keys.reduce((updated, key) => {
  key in obj && (updated[key] = obj[key]);
  return updated;
}, {}) || {};
/**
 * Loop over and objects props and values and reduce to new object.
 * @function
 * @param {Object} obj
 * @return {Object} - updated object
 */


exports.pickKeys = pickKeys;

const reduceObj = (obj, cb, start = {}) => isObj(obj) && (0, _method.isFunc)(cb) && Object.entries(obj).reduce((data, [key, value]) => cb(key, value, data), start) || start;
/**
 * Sanitizes all html strings in an object's properties.
 * @function
 * @param {Object} obj to be sanitize
 * @return {Object} - obj with strings sanitized
 */


exports.reduceObj = reduceObj;

const sanitizeCopy = obj => JSON.parse((0, _string.sanitize)(JSON.stringify(obj)));
/**
 * Trims objects string fields.
 * @function
 * @param {Object} object
 * @return {Object} - object with string fields trimmed
 */


exports.sanitizeCopy = sanitizeCopy;

const trimStringFields = object => Object.entries(object).reduce((cleaned, [key, value]) => {
  cleaned[key] = typeof value === 'string' ? value.trim() : value;
  return cleaned;
}, object);
/**
 * Converts an array or string into an object.
 * @function
 * @param { array | string } val - to be converted to object
 * @param {string} divider - if string, what divides key from value
 * @param {string} split - if string, what splits each key/value pair
 * @return {Object} - converted object 
 */


exports.trimStringFields = trimStringFields;

const toObj = (val, divider, split) => {
  if ((0, _array.isArr)(val)) return Object.keys(val).reduce((obj, key) => {
    obj[key] = val[key];
    return obj;
  }, {});
  if (!(0, _string.isStr)(str)) return {};
  divider = divider || '=';
  split = split || '&';
  return str.split(split).reduce((obj, item) => {
    const sep = item.split(divider);
    obj[sep[0].trim()] = (0, _ext.strToType)(sep[1].trim());
    return obj;
  }, {});
};
/**
 * Converts an array of strings to a matching key/value pair object.
 * @function
 * @param {Array} arr - to be converted to object
 * @param {string} toUpperCase - converts the key and value to uppercase
 * @return {Object} built object
 */


exports.toObj = toObj;

const keyMap = (arr, toUpperCase) => (0, _array.isArr)(arr) && arr.reduce((obj, key) => {
  if (!(0, _string.isStr)(key)) return obj;
  const use = toUpperCase && key.toUpperCase() || key;
  obj[use] = use;
  return obj;
}, {}) || {};

exports.keyMap = keyMap;