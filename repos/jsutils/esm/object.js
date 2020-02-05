/** @module object */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.every");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.some");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-names");

require("core-js/modules/es.object.is-frozen");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cloneJson = function cloneJson(obj) {
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

var mapKeys = function mapKeys(obj, keyMapper) {
  if (!isObj(obj) || !(0, _method.isFunc)(keyMapper)) return obj;
  return mapEntries(obj, function (key, value) {
    return [keyMapper(key), value];
  });
};
/**
 * Removes all properties from an object.
 * @function
 * @param {Object} obj - object to remove properties from
 * @param {Array} filter - list of keys to not remove
 * @returns { null }
 */


exports.mapKeys = mapKeys;

var clearObj = function clearObj(obj, filter) {
  obj && Object.entries(obj).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (filter && filter.indexOf(key) !== -1) return;
    if (_typeof(value) === 'object') clearObj(value);
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

var eitherObj = function eitherObj(obj1, obj2) {
  return isObj(obj1) && obj1 || obj2;
};
/**
 * Recursively freezes and object.
 * @function
 * @param {Object} obj
 * @return {Object} - frozen Object
 */


exports.eitherObj = eitherObj;

var deepFreeze = function deepFreeze(obj) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).map(function (prop) {
    obj.hasOwnProperty(prop) && obj[prop] !== null && (_typeof(obj[prop]) === 'object' || (0, _method.isFunc)(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
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

var deepMerge = function deepMerge() {
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return sources.reduce(function (merged, source) {
    return (0, _array.isArr)(source) // Check if it's array, and join the arrays
    ? [].concat(_toConsumableArray((0, _array.isArr)(merged) && merged || []), _toConsumableArray((0, _collection.deepClone)(source))) // Check if it's an object, and loop the properties
    : isObj(source) // Loop the entries of the object, and add them to the merged object
    ? Object.entries(source).reduce(function (joined, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      return _objectSpread({}, joined, _defineProperty({}, key, (0, _collection.isColl)(value) && key in joined // This will always return an object
      // So if it gets called then value is not getting set
      ? deepMerge(joined[key], (0, _collection.deepClone)(value)) // Otherwise just set the value
      : (0, _collection.deepClone)(value)));
    }, merged) // If it's not an array or object, just return the merge object
    : merged;
  }, // Check the first source to decide what to merged value should start as
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

var applyToCloneOf = function applyToCloneOf(obj, mutatorCb) {
  var error;
  if (!obj) error = 'object (Argument 1) in applyToCloneOf, must be defined!';
  if (!isObj(obj)) error = 'object (Argument 1) in applyToCloneOf, must be an object!';
  if (!mutatorCb) error = 'mutator (Argument 2) in applyToCloneOf, must be defined!';
  if (!(0, _method.isFunc)(mutatorCb)) error = 'mutator (Argument 2) arg in applyToCloneOf, must be a function!';
  if (error) return console.warn(error) || obj;
  var clone = (0, _collection.deepClone)(obj);
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

var hasOwn = function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
/**
 * Checks if data is an object and not an array.
 * @function
 * @param {Object} obj - data to check
 * @returns {boolean}
 */


exports.hasOwn = hasOwn;

var isObj = function isObj(obj) {
  return _typeof(obj) === 'object' && !Array.isArray(obj) && obj !== null;
};
/**
 * Compares two objects by converting to JSON, and checking string equality.
 * @function
 * @param { object | array } one - object to compare with param two
 * @param { object | array } two - object to compare with param one
 * @return {boolean} status of equality
 */


exports.isObj = isObj;

var jsonEqual = function jsonEqual(one, two) {
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

var mapObj = function mapObj(obj, cb) {
  return isObj(obj) && (0, _method.isFunc)(cb) && Object.entries(obj).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];

    return cb(key, value);
  }) || obj;
};
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

var mapEntries = function mapEntries(obj, cb) {
  if (!(0, _array.isArr)(obj) && !isObj(obj)) {
    console.error(obj, "Expected array or object for obj. Found ".concat(_typeof(obj)));
    return obj;
  }

  if (!(0, _method.isFunc)(cb)) {
    console.error("Expected function for cb. Found ".concat(_typeof(cb)));
    return obj;
  }

  var entries = Object.entries(obj);
  var initialValue = (0, _array.isArr)(obj) ? [] : {};
  return entries.reduce(function (obj, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        value = _ref8[1];

    var result = cb(key, value);

    if (!isEntry(result)) {
      console.error("Callback function must return entry. Found: ".concat(result, ". Using current entry instead."));
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

var isEntry = function isEntry(maybeEntry) {
  return (0, _array.isArr)(maybeEntry) && maybeEntry.length === 2 && ((0, _number.isNum)(maybeEntry[0]) || (0, _string.isStr)(maybeEntry[0]));
};
/**
 * Creates a new object from passed in object with keys not defined from array.
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to not add to new object
 * @return {Object} new object with only keys not in array
 */


exports.isEntry = isEntry;

var omitKeys = function omitKeys() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return isObj(obj) && reduceObj(obj, function (key, _, updated) {
    keys.indexOf(key) === -1 && (updated[key] = obj[key]);
    return updated;
  }, {}) || {};
};
/**
 * Creates a new object from passed in object with keys defined from array.
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to add to new object
 * @return {Object} new object with only keys from passed in keys array
 */


exports.omitKeys = omitKeys;

var pickKeys = function pickKeys() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return isObj(obj) && keys.reduce(function (updated, key) {
    key in obj && (updated[key] = obj[key]);
    return updated;
  }, {}) || {};
};
/**
 * Loop over and objects props and values and reduce to new object.
 * @function
 * @param {Object} obj
 * @return {Object} - updated object
 */


exports.pickKeys = pickKeys;

var reduceObj = function reduceObj(obj, cb) {
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return isObj(obj) && (0, _method.isFunc)(cb) && Object.entries(obj).reduce(function (data, _ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        key = _ref10[0],
        value = _ref10[1];

    return cb(key, value, data);
  }, start) || start;
};
/**
 * Sanitizes all html strings in an object's properties.
 * @function
 * @param {Object} obj to be sanitize
 * @return {Object} - obj with strings sanitized
 */


exports.reduceObj = reduceObj;

var sanitizeCopy = function sanitizeCopy(obj) {
  return JSON.parse((0, _string.sanitize)(JSON.stringify(obj)));
};
/**
 * Trims objects string fields.
 * @function
 * @param {Object} object
 * @return {Object} - object with string fields trimmed
 */


exports.sanitizeCopy = sanitizeCopy;

var trimStringFields = function trimStringFields(object) {
  return Object.entries(object).reduce(function (cleaned, _ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        key = _ref12[0],
        value = _ref12[1];

    cleaned[key] = typeof value === 'string' ? value.trim() : value;
    return cleaned;
  }, object);
};
/**
 * Converts an array or string into an object.
 * @function
 * @param { array | string } val - to be converted to object
 * @param {string} divider - if string, what divides key from value
 * @param {string} split - if string, what splits each key/value pair
 * @return {Object} - converted object 
 */


exports.trimStringFields = trimStringFields;

var toObj = function toObj(val, divider, split) {
  if ((0, _array.isArr)(val)) return Object.keys(val).reduce(function (obj, key) {
    obj[key] = val[key];
    return obj;
  }, {});
  if (!(0, _string.isStr)(str)) return {};
  divider = divider || '=';
  split = split || '&';
  return str.split(split).reduce(function (obj, item) {
    var sep = item.split(divider);
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

var keyMap = function keyMap(arr, toUpperCase) {
  return (0, _array.isArr)(arr) && arr.reduce(function (obj, key) {
    if (!(0, _string.isStr)(key)) return obj;
    var use = toUpperCase && key.toUpperCase() || key;
    obj[use] = use;
    return obj;
  }, {}) || {};
};
/**
 * Like "every" for arrays, but operates across each entry in obj
 * @function
 * @param {Object} obj 
 * @param {Function} predicate of form (key, value) => boolean. Returns true or false for the entry
 * @returns boolean indicating that every entry satisfied the predicate or not
 */


exports.keyMap = keyMap;

var everyEntry = function everyEntry(obj, predicate) {
  if (!obj) {
    console.error("everyEntry expects argument obj [".concat(obj, "] to be defined."));
    return false;
  }

  if (!isObj(obj)) {
    console.error("Argument obj ".concat(obj, " must be an object."));
    return false;
  }

  if (!(0, _method.isFunc)(predicate)) {
    console.error("Argument 'predicate' passed into everyEntry must a function. Found: ".concat(predicate));
    return false;
  }

  return (0, _method.pipeline)(obj, Object.entries, function (entries) {
    return entries.every(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          key = _ref14[0],
          value = _ref14[1];

      return predicate(key, value);
    });
  });
};
/**
 * Like "some" for arrays, but operates across each entry in obj
 * @function
 * @param {Object} obj 
 * @param {Function} predicate of form (key, value) => boolean. Returns true or false for the entry
 * @returns boolean indicating that at least one entry satisfied the predicate or not
 */


exports.everyEntry = everyEntry;

var someEntry = function someEntry(obj, predicate) {
  if (!obj) {
    console.error("someEntry expects argument obj [".concat(obj, "] to be defined."));
    return false;
  }

  if (!isObj(obj)) {
    console.error("Argument obj ".concat(obj, " must be an object."));
    return false;
  }

  if (!(0, _method.isFunc)(predicate)) {
    console.error("Argument 'predicate' passed into someEntry must a function. Found: ".concat(predicate));
    return false;
  }

  return (0, _method.pipeline)(obj, Object.entries, function (entries) {
    return entries.some(function (_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
          key = _ref16[0],
          value = _ref16[1];

      return predicate(key, value);
    });
  });
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

var filterObj = function filterObj(obj, predicate) {
  if (!obj) return obj;

  if (!isObj(obj)) {
    console.error("Object ".concat(obj, " was not an object. It must be for filterObject"));
    return obj;
  }

  if (!(0, _method.isFunc)(predicate)) {
    console.error("Argument 'predicate' passed into filterObject must a function. Found: ".concat(predicate));
    return obj;
  }

  return reduceObj(obj, function (key, value, data) {
    if (predicate(key, value)) data[key] = value;
    return data;
  }, {});
};

exports.filterObj = filterObj;