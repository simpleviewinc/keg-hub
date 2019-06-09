"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

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
exports.toObj = exports.trimStringFields = exports.sanitizeCopy = exports.reduceObj = exports.pickKeys = exports.omitKeys = exports.mapObj = exports.jsonEqual = exports.isObj = exports.hasOwn = exports.deepMerge = exports.deepFreeze = exports.clearObj = exports.cloneJson = void 0;

var _log = require("./log");

var _method = require("./method");

var _string = require("./string");

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

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Clones an object by converting to JSON string and back
 * @param { object } obj - object to clone
 * @returns { object } copy of original object
 */
var cloneJson = function cloneJson(obj) {
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
 * Recursively freezes and object
 * @param  { object } obj
 * @return { object } - frozen Object
 */


exports.clearObj = clearObj;

var deepFreeze = function deepFreeze(obj) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).map(function (prop) {
    obj.hasOwnProperty(prop) && obj[prop] !== null && (_typeof(obj[prop]) === 'object' || (0, _method.isFunc)(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
  });
  return obj;
};
/**
 * Deep merges an array of objects together
 * @param { array } sources - array of objects to join
 * @returns { object | array } - merged object or array
 */


exports.deepFreeze = deepFreeze;

var deepMerge = function deepMerge() {
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return sources.reduce(function (merged, source) {
    return source instanceof Array ? // Check if it's array, and join the arrays
    [].concat(_toConsumableArray(merged instanceof Array && merged || []), _toConsumableArray(source)) : // Check if it's an object, and loop the properties
    source instanceof Object ? Object.entries(source) // Loop the entries of the object, and add them to the merged object
    .reduce(function (joined, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      return _objectSpread({}, joined, _defineProperty({}, key, // Check if the value is not a function and is an object
      // Also check if key is in the object
      // Set to value or deepMerge the object with the current merged object
      !(0, _method.isFunc)(value) && value instanceof Object && key in joined && // This will always return an object
      // So if it gets called then value is not getting set
      deepMerge(joined[key], value) || // Otherwise just set the value
      value));
    }, // Pass in merged at the joined object
    merged) : // If it's not an array or object, just return the merge object
    merged;
  }, {});
};
/**
 * Checks if prop exists on the object
 * @param { object } obj - data to check
 * @param { string } prop - prop to check for
 * @returns { boolean } T/F if the prop exists
 */


exports.deepMerge = deepMerge;

var hasOwn = function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
/**
 * Checks if data is an object and not an array
 * @param { object } obj - data to check
 * @returns { boolean }
 */


exports.hasOwn = hasOwn;

var isObj = function isObj(obj) {
  return _typeof(obj) === 'object' && !Array.isArray(obj) && obj !== null;
};
/**
 * Compares two objects by converting to JSON, and checking string equality
 * @param  { object || array } one - object to compare with param two
 * @param  { object || array } two - object to compare with param one
 * @return { boolean } status of equality
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
 * Map over and objects props and values
 * @param  { object } obj
 * @return { array } -  returned values from callback
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
 * Creates a new object from passed in object with keys not defined from array
 * @param  { object } target - object to pull keys from
 * @param  { array } keys - keys to not add to new object
 * @return { object } new object with only keys not in array
 */


exports.mapObj = mapObj;

var omitKeys = function omitKeys() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return reduceTargetKeys(target, keys, function (acc, key) {
    return keys.some(function (omitKey) {
      return omitKey === key;
    }) ? acc : _objectSpread({}, acc, _defineProperty({}, key, target[key]));
  });
};
/**
 * Creates a new object from passed in object with keys defined from array
 * @param  { object } target - object to pull keys from
 * @param  { array } keys - keys to add to new object
 * @return { object } new object with only keys from passed in keys array
 */


exports.omitKeys = omitKeys;

var pickKeys = function pickKeys() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return reduceTargetKeys(target, keys, function (acc, key) {
    return keys.some(function (pickKey) {
      return pickKey === key;
    }) ? _objectSpread({}, acc, _defineProperty({}, key, target[key])) : acc;
  });
};
/**
 * Loop over and objects props and values and reduce to new object
 * @param  { object } obj
 * @return { object } - updated object
 */


exports.pickKeys = pickKeys;

var reduceObj = function reduceObj(obj, cb) {
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return isObj(obj) && (0, _method.isFunc)(cb) && Object.entries(obj).reduce(function (data, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        value = _ref8[1];

    return cb(key, value, data);
  }, start) || {};
};
/**
 * Sanitizes all html strings in an object's properties
 * @param  { object } obj to be sanitize
 * @return { object } - obj with strings sanitized
 */


exports.reduceObj = reduceObj;

var sanitizeCopy = function sanitizeCopy(obj) {
  return JSON.parse((0, _string.sanitize)(JSON.stringify(obj)));
};
/**
 * Trims objects string fields
 * @param  { object } object
 * @return { object } - object with string fields trimmed
 */


exports.sanitizeCopy = sanitizeCopy;

var trimStringFields = function trimStringFields(object) {
  return Object.entries(object).reduce(function (cleaned, _ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        key = _ref10[0],
        value = _ref10[1];

    cleaned[key] = typeof value === 'string' ? value.trim() : value;
    return cleaned;
  }, object);
};
/**
 * Converts an array or string into an object
 * @param  { object } object
 * @return { object } - value converted into an object
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
  str.split(split).reduce(function (obj, item) {
    var sep = item.split(divider);
    obj[sep[0].trim()] = (0, _ext.strToType)(sep[1].trim());
    return obj;
  }, {});
};

exports.toObj = toObj;