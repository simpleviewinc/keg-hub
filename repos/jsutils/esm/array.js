/** @module array */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.flat-map");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.array.unscopables.flat-map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatMap = exports.omitRange = exports.cloneArr = exports.isArr = exports.uniqArr = exports.randomizeArr = exports.randomArr = void 0;

var _number = require("./number");

var _object = require("./object");

var _method = require("./method");

var _validation = require("./validation");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var randomArr = function randomArr(arr, amount) {
  if (!isArr(arr)) return arr;
  var useAmount = amount || 1;
  var randoms = [];

  for (var i = 0; i < useAmount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  return !amount ? randoms[0] : randoms;
};
/**
 * Randomly sorts an arrays items.
 * @function
 * @example
 * randomizeArr([1,2,3])
 * // Returns an array randomly sorted
 * @param {array} arr - array to randomly sorted
 * @return {array} - randomly sorted array
 */


exports.randomArr = randomArr;

var randomizeArr = function randomizeArr(arr) {
  return !isArr(arr) && arr || arr.sort(function () {
    return 0.5 - Math.random();
  });
};
/**
 * Removes duplicates from an array.
 * @function
 * @example
 * uniqArr([1,1,2,3,3])
 * // Returns array with only unique values [ 1, 2, 3 ]
 * @param {array} arr - array to remove duplicates from
 * @return {array} - copy of passed in array, with duplicates removed
 */


exports.randomizeArr = randomizeArr;

var uniqArr = function uniqArr(arr) {
  return !isArr(arr) && arr || arr.filter(function (e, i, arr) {
    return arr.indexOf(e) == i;
  });
};
/**
 * Checks if passed in value is an array.
 * @function
 * @example
 * isArr([1,2,3])
 * // Returns true
 * @param {any} value - value to be check if is an array
 * @return {boolean} - T/F value is an array
 */


exports.uniqArr = uniqArr;

var isArr = function isArr(value) {
  return Array.isArray(value);
};
/**
 * Creates a copy of the passed in array.
 * <br> Returns empty array, if param is not an array.
 * @function
 * @example
 * cloneArr([1,2,3])
 * // Returns copy of the passed on array
 * @param {array} arr - array to be copied
 * @return {array} - copy of passed in array
 */


exports.isArr = isArr;

var cloneArr = function cloneArr(arr) {
  return Array.from(_toConsumableArray(isArr(arr) && arr || (0, _object.isObj)(arr) && Object.entries(arr) || []));
};
/**
 * Returns a new array with the same elements as arr, excluding `count` elements beginning at index `startIndex`
 * @function
 * @param {Array} arr 
 * @param {Number} startIndex 
 * @param {Number} count 
 */


exports.cloneArr = cloneArr;

var omitRange = function omitRange(arr, startIndex, count) {
  var _validate = (0, _validation.validate)({
    arr: arr,
    startIndex: startIndex,
    count: count
  }, {
    arr: isArr,
    $default: _number.isNonNegative
  }),
      _validate2 = _slicedToArray(_validate, 1),
      inputIsValid = _validate2[0];

  if (!inputIsValid) return arr;

  var nextArr = _toConsumableArray(arr);

  nextArr.splice(startIndex, count);
  return nextArr;
};
/**
 * Maps each element using mapping function `mapFn`, but returns the result as a flattened array.
 * It is equivalent to map() followed by flattening to depth 1, but flatMap is a useful shortcut,
 * and merging both steps into one method (with one pass over the array) is slightly more efficient. 
 * @function
 * @example
 * [1, 2].map(x => [x * 2]) // returns [[2], [4]]
 * flatMap([1, 2], x => [x * 2]) // returns [2, 4]
 * @param {Array} arr - array to map across
 * @param {Function} mapFn - function for mapping
 */


exports.omitRange = omitRange;

var flatMap = function flatMap(arr, mapFn) {
  var _validate3 = (0, _validation.validate)({
    arr: arr,
    mapFn: mapFn
  }, {
    arr: isArr,
    mapFn: _method.isFunc
  }),
      _validate4 = _slicedToArray(_validate3, 1),
      inputIsValid = _validate4[0];

  if (!inputIsValid) return arr; // iterate across the array, calling mapFn on each element, then flattening into final array

  return arr.reduce(function (finalArr, current) {
    var result = mapFn(current);
    isArr(result) ? result.map(function (el) {
      return finalArr.push(el);
    }) : finalArr.push(result);
    return finalArr;
  }, []);
};

exports.flatMap = flatMap;