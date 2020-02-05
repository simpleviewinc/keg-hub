/** @module object */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterObj = exports.someEntry = exports.everyEntry = exports.keyMap = exports.toObj = exports.trimStringFields = exports.sanitizeCopy = exports.reduceObj = exports.pickKeys = exports.omitKeys = exports.isEntry = exports.mapEntries = exports.mapObj = exports.jsonEqual = exports.isObj = exports.hasOwn = exports.applyToCloneOf = exports.deepMerge = exports.deepFreeze = exports.eitherObj = exports.clearObj = exports.mapKeys = exports.cloneJson = void 0;

var _log = require("./log");

var _method = require("./method");

var _collection = require("./collection");

var _string = require("./string");

var _number = require("./number");

var _array = require("./array");

var _ext = require("./ext");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const cloneJson = obj => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    (0, _log.logData)(e.message, 'error');
    return null;
  }
};
/**
 * Shortcut helper for mapping just the keys of an object.
 * @function
 * @param {Object} obj 
 * @param {Function} keyMapper: (key) => nextKey
 * @returns the new object with each key mapped
 */


exports.cloneJson = cloneJson;

const mapKeys = (obj, keyMapper) => {
  if (!isObj(obj) || !(0, _method.isFunc)(keyMapper)) return obj;
  return mapEntries(obj, (key, value) => [keyMapper(key), value]);
};
/**
 * Removes all properties from an object.
 * @function
 * @param {Object} obj - object to remove properties from
 * @param {Array} filter - list of keys to not remove
 * @returns { null }
 */


exports.mapKeys = mapKeys;

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
  return sources.reduce((merged, source) => (0, _array.isArr)(source) // Check if it's array, and join the arrays
  ? [...((0, _array.isArr)(merged) && merged || []), ...(0, _collection.deepClone)(source)] // Check if it's an object, and loop the properties
  : isObj(source) // Loop the entries of the object, and add them to the merged object
  ? Object.entries(source).reduce((joined, [key, value]) => _objectSpread({}, joined, {
    // Check if the value is not a function and is an object
    // Also check if key is in the object
    // Set to value or deepMerge the object with the current merged object
    [key]: (0, _collection.isColl)(value) && key in joined // This will always return an object
    // So if it gets called then value is not getting set
    ? deepMerge(joined[key], (0, _collection.deepClone)(value)) // Otherwise just set the value
    : (0, _collection.deepClone)(value) // Pass in merged at the joined object

  }), merged) // If it's not an array or object, just return the merge object
  : merged, // Check the first source to decide what to merged value should start as
  (0, _array.isArr)(sources[0]) && [] || {});
};
/**
 * Deep clones Object obj, then returns the result of calling function mutatorCb with the clone as its argument
 * @example
 * const obj = {}
 * const clone = applyToCloneOf(obj, (clone) => { clone.test = 'foo'; return clone })
 * console.log(obj === clone) // prints false
 * console.log(clone.test === 'foo') // prints true
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
 * Returns a new object, each entry of which is the result of applying the cb function to input's corresponding entry 
 * @param {Object | Array} obj - regular object or array
 * @param {Function} cb  - function of form: (key, value) => [nextKey, nextValue]
 *  - the return type here is an array of two elements, key and value, where `key` must be either a string or a number
 *  - if a cb does not return an entry, then the original [key, value] pair that was passed into cb will be used instead
 * @returns new object with mapping applied, or the original obj if input was invalid
 * @example mapObj({a: 2, b: 3}, (k, v) => [k, v * v]) returns: {a: 4, b: 9}
 * @example mapObj({a: 1}, (k, v) => ['b', v]) returns: {b: 1}
 */


exports.mapObj = mapObj;

const mapEntries = (obj, cb) => {
  if (!(0, _array.isArr)(obj) && !isObj(obj)) {
    console.error(obj, `Expected array or object for obj. Found ${typeof obj}`);
    return obj;
  }

  if (!(0, _method.isFunc)(cb)) {
    console.error(`Expected function for cb. Found ${typeof cb}`);
    return obj;
  }

  const entries = Object.entries(obj);
  const initialValue = (0, _array.isArr)(obj) ? [] : {};
  return entries.reduce((obj, [key, value]) => {
    const result = cb(key, value);

    if (!isEntry(result)) {
      console.error(`Callback function must return entry. Found: ${result}. Using current entry instead.`);
      return (0, _collection.set)(obj, key, value);
    }

    return (0, _collection.set)(obj, result[0], result[1]);
  }, initialValue);
};
/**
 * Checks if the input is a valid entry - a 2-element array, like what Object.entries produces.
 * Expects the first element in the entry to be either a string or a number.
 * @param {*} maybeEntry 
 * @returns true if it is an entry, false otherwise
 * @example isEntry([1, 2]) // true
 * @example isEntry(["id", 87]) // true
 * @example isEntry([new Date(), 2]) // false, first element not string or number
 * @example isEntry([1, 2, 3]) // false, too many elements
 */


exports.mapEntries = mapEntries;

const isEntry = maybeEntry => (0, _array.isArr)(maybeEntry) && maybeEntry.length === 2 && ((0, _number.isNum)(maybeEntry[0]) || (0, _string.isStr)(maybeEntry[0]));
/**
 * Creates a new object from passed in object with keys not defined from array.
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to not add to new object
 * @return {Object} new object with only keys not in array
 */


exports.isEntry = isEntry;

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
/**
 * Like "every" for arrays, but operates across each entry in obj
 * @function
 * @param {Object} obj 
 * @param {Function} predicate of form (key, value) => boolean. Returns true or false for the entry
 * @returns boolean indicating that every entry satisfied the predicate or not
 */


exports.keyMap = keyMap;

const everyEntry = (obj, predicate) => {
  if (!obj) {
    console.error(`everyEntry expects argument obj [${obj}] to be defined.`);
    return false;
  }

  if (!isObj(obj)) {
    console.error(`Argument obj ${obj} must be an object.`);
    return false;
  }

  if (!(0, _method.isFunc)(predicate)) {
    console.error(`Argument 'predicate' passed into everyEntry must a function. Found: ${predicate}`);
    return false;
  }

  return (0, _method.pipeline)(obj, Object.entries, entries => entries.every(([key, value]) => predicate(key, value)));
};
/**
 * Like "some" for arrays, but operates across each entry in obj
 * @function
 * @param {Object} obj 
 * @param {Function} predicate of form (key, value) => boolean. Returns true or false for the entry
 * @returns boolean indicating that at least one entry satisfied the predicate or not
 */


exports.everyEntry = everyEntry;

const someEntry = (obj, predicate) => {
  if (!obj) {
    console.error(`someEntry expects argument obj [${obj}] to be defined.`);
    return false;
  }

  if (!isObj(obj)) {
    console.error(`Argument obj ${obj} must be an object.`);
    return false;
  }

  if (!(0, _method.isFunc)(predicate)) {
    console.error(`Argument 'predicate' passed into someEntry must a function. Found: ${predicate}`);
    return false;
  }

  return (0, _method.pipeline)(obj, Object.entries, entries => entries.some(([key, value]) => predicate(key, value)));
};
/**
 * Returns a new object, consisting of every key-value pair from obj that, when passed into the predicate, returned true
 * @function
 * @param {*} obj - regular object
 * @param {*} predicate  - function of form: (key, value) => Boolean
 * @returns object consisting of a subset of the entries from obj
 * @example: filterObj({a: 2, b: 3}, (k, v) => (v > 2)) returns: {b: 3}
 */


exports.someEntry = someEntry;

const filterObj = (obj, predicate) => {
  if (!obj) return obj;

  if (!isObj(obj)) {
    console.error(`Object ${obj} was not an object. It must be for filterObject`);
    return obj;
  }

  if (!(0, _method.isFunc)(predicate)) {
    console.error(`Argument 'predicate' passed into filterObject must a function. Found: ${predicate}`);
    return obj;
  }

  return reduceObj(obj, (key, value, data) => {
    if (predicate(key, value)) data[key] = value;
    return data;
  }, {});
};

exports.filterObj = filterObj;