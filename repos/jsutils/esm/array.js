/** @module array */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.array.splice");

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
exports.omitRange = exports.cloneArr = exports.isArr = exports.uniqArr = exports.randomizeArr = exports.randomArr = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('./number'),
    isNum = _require.isNum;

var _require2 = require('./object'),
    isObj = _require2.isObj;
/**
 * Randomly selects values from a passed in array.
 * @function
 * @example
 * randomArr([1,2,3], 1)
 * // Returns an array with one of the values in the passed in array
 * @param {array} arr - array to select values from
 * @param {number} amount - number of values to select from the array
 * @return {array} - randomly sorted array
 */


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
  return Array.from(_toConsumableArray(isArr(arr) && arr || isObj(arr) && Object.entries(arr) || []));
};
/**
 * Returns a new array with the same elements as arr, excluding `count` elements beginning at index `startIndex`
 * @param {Array} arr 
 * @param {Number} startIndex 
 * @param {Number} count 
 */


exports.cloneArr = cloneArr;

var omitRange = function omitRange(arr, startIndex, count) {
  if (!isArr(arr)) {
    console.error("omitRange expected Array. Found ".concat(_typeof(arr)));
    return arr;
  }

  if (!isNum(startIndex) || startIndex < 0) {
    console.error("omitRange expected non-negative startIndex. Found ".concat(startIndex));
    return arr;
  }

  if (!isNum(count) || count < 0) {
    console.error("omitRange expected non-negative count. Found ".concat(count));
    return arr;
  }

  var nextArr = _toConsumableArray(arr);

  nextArr.splice(startIndex, count);
  return nextArr;
};

exports.omitRange = omitRange;