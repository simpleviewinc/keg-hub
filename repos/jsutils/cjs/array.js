/** @module array */
'use strict';

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

const randomArr = (arr, amount) => {
  if (!isArr(arr)) return arr;
  const useAmount = amount || 1;
  const randoms = [];

  for (let i = 0; i < useAmount; i++) {
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

const randomizeArr = arr => !isArr(arr) && arr || arr.sort(() => 0.5 - Math.random());
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

const uniqArr = arr => !isArr(arr) && arr || arr.filter((e, i, arr) => arr.indexOf(e) == i);
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

const isArr = value => Array.isArray(value);
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

const cloneArr = arr => Array.from([// If arr is not an array or object, just use empty array, so we don't throw!
...(isArr(arr) && arr || (0, _object.isObj)(arr) && Object.entries(arr) || [])]);
/**
 * Returns a new array with the same elements as arr, excluding `count` elements beginning at index `startIndex`
 * @function
 * @param {Array} arr 
 * @param {Number} startIndex 
 * @param {Number} count 
 */


exports.cloneArr = cloneArr;

const omitRange = (arr, startIndex, count) => {
  const _validate = (0, _validation.validate)({
    arr,
    startIndex,
    count
  }, {
    arr: isArr,
    $default: _number.isNonNegative
  }),
        _validate2 = _slicedToArray(_validate, 1),
        inputIsValid = _validate2[0];

  if (!inputIsValid) return arr;
  const nextArr = [...arr];
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

const flatMap = (arr, mapFn) => {
  const _validate3 = (0, _validation.validate)({
    arr,
    mapFn
  }, {
    arr: isArr,
    mapFn: _method.isFunc
  }),
        _validate4 = _slicedToArray(_validate3, 1),
        inputIsValid = _validate4[0];

  if (!inputIsValid) return arr; // iterate across the array, calling mapFn on each element, then flattening into final array

  return arr.reduce((finalArr, current) => {
    const result = mapFn(current);
    isArr(result) ? result.map(el => finalArr.push(el)) : finalArr.push(result);
    return finalArr;
  }, []);
};

exports.flatMap = flatMap;