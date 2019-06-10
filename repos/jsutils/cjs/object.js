"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toObj = exports.trimStringFields = exports.sanitizeCopy = exports.reduceObj = exports.pickKeys = exports.omitKeys = exports.mapObj = exports.jsonEqual = exports.isObj = exports.hasOwn = exports.deepMerge = exports.deepFreeze = exports.eitherObj = exports.clearObj = exports.cloneJson = void 0;

var _log = require("./log");

var _method = require("./method");

var _string = require("./string");

var _array = require("./array");

var _ext = require("./ext");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Clones an object by converting to JSON string and back
 * @param { object } obj - object to clone
 * @returns { object } copy of original object
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
 * Removes all properties from an object
 * @param { object } obj - object to remove properties from
 * @param { array } filter - list of keys to not remove
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
 * Returns the first param if correct type of second param
 * @param { object } obj1 - return if is object
 * @param { object } obj2 - use if first is not an object
 * @returns { obj }
 */


exports.clearObj = clearObj;

const eitherObj = (obj1, obj2) => isObj(obj1) && obj1 || obj2;
/**
 * Recursively freezes and object
 * @param  { object } obj
 * @return { object } - frozen Object
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
 * Deep merges an array of objects together
 * @param { array } sources - array of objects to join
 * @returns { object | array } - merged object or array
 */


exports.deepFreeze = deepFreeze;

const deepMerge = (...sources) => sources.reduce((merged, source) => source instanceof Array ? // Check if it's array, and join the arrays
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
/**
 * Checks if prop exists on the object
 * @param { object } obj - data to check
 * @param { string } prop - prop to check for
 * @returns { boolean } T/F if the prop exists
 */


exports.deepMerge = deepMerge;

const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
/**
 * Checks if data is an object and not an array
 * @param { object } obj - data to check
 * @returns { boolean }
 */


exports.hasOwn = hasOwn;

const isObj = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
/**
 * Compares two objects by converting to JSON, and checking string equality
 * @param  { object || array } one - object to compare with param two
 * @param  { object || array } two - object to compare with param one
 * @return { boolean } status of equality
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
 * Map over and objects props and values
 * @param  { object } obj
 * @return { array } -  returned values from callback
 */


exports.jsonEqual = jsonEqual;

const mapObj = (obj, cb) => isObj(obj) && (0, _method.isFunc)(cb) && Object.entries(obj).map(([key, value]) => cb(key, value)) || obj;
/**
 * Creates a new object from passed in object with keys not defined from array
 * @param  { object } target - object to pull keys from
 * @param  { array } keys - keys to not add to new object
 * @return { object } new object with only keys not in array
 */


exports.mapObj = mapObj;

const omitKeys = (target = {}, keys = []) => reduceTargetKeys(target, keys, (acc, key) => keys.some(omitKey => omitKey === key) ? acc : _objectSpread({}, acc, {
  [key]: target[key]
}));
/**
 * Creates a new object from passed in object with keys defined from array
 * @param  { object } target - object to pull keys from
 * @param  { array } keys - keys to add to new object
 * @return { object } new object with only keys from passed in keys array
 */


exports.omitKeys = omitKeys;

const pickKeys = (target = {}, keys = []) => reduceTargetKeys(target, keys, (acc, key) => keys.some(pickKey => pickKey === key) ? _objectSpread({}, acc, {
  [key]: target[key]
}) : acc);
/**
 * Loop over and objects props and values and reduce to new object
 * @param  { object } obj
 * @return { object } - updated object
 */


exports.pickKeys = pickKeys;

const reduceObj = (obj, cb, start = {}) => isObj(obj) && (0, _method.isFunc)(cb) && Object.entries(obj).reduce((data, [key, value]) => cb(key, value, data), start) || {};
/**
 * Sanitizes all html strings in an object's properties
 * @param  { object } obj to be sanitize
 * @return { object } - obj with strings sanitized
 */


exports.reduceObj = reduceObj;

const sanitizeCopy = obj => JSON.parse((0, _string.sanitize)(JSON.stringify(obj)));
/**
 * Trims objects string fields
 * @param  { object } object
 * @return { object } - object with string fields trimmed
 */


exports.sanitizeCopy = sanitizeCopy;

const trimStringFields = object => Object.entries(object).reduce((cleaned, [key, value]) => {
  cleaned[key] = typeof value === 'string' ? value.trim() : value;
  return cleaned;
}, object);
/**
 * Converts an array or string into an object
 * @param  { object } object
 * @return { object } - value converted into an object
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
  str.split(split).reduce((obj, item) => {
    const sep = item.split(divider);
    obj[sep[0].trim()] = (0, _ext.strToType)(sep[1].trim());
    return obj;
  }, {});
};

exports.toObj = toObj;