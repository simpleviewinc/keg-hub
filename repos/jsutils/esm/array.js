/** @module array */
'use strict';
/**
 * Randomly selects values from a passed in array.
 * @function
 * @example
 * randomArray([1,2,3], 1)
 * // Returns an array with one of the values in the passed in array
 * @param {array} arr - array to select values from
 * @param {number} amount - number of values to select from the array
 * @return {array} - randomly sorted array
 */

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneArr = exports.isArr = exports.uniqArr = exports.randomizeArray = exports.randomArray = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var randomArray = function randomArray(arr, amount) {
  amount = amount || 1;
  var randoms = [];

  for (var i = 0; i < amount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  return amount === 1 ? randoms[0] : randoms;
};
/**
 * Randomly sorts an arrays items.
 * @function
 * @example
 * randomizeArray([1,2,3])
 * // Returns an array randomly sorted
 * @param {array} arr - array to randomly sorted
 * @return {array} - randomly sorted array
 */


exports.randomArray = randomArray;

var randomizeArray = function randomizeArray(arr) {
  return arr.sort(function () {
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


exports.randomizeArray = randomizeArray;

var uniqArr = function uniqArr(arr) {
  return isArr(arr) && arr.filter(function (e, i, arr) {
    return arr.indexOf(e) == i;
  }) || arr;
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
  return Array.from(_toConsumableArray(isArr(arr) && arr || []));
};

exports.cloneArr = cloneArr;