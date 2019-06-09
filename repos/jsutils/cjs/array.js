"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.sort");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneArr = exports.isArr = exports.uniqArr = exports.randomizeArray = exports.randomArray = void 0;

/**
 * Randomly selects values from a passed in array
 * @param  { array } arr - array to select values from
 * @param  { number } amount - number of values to select from the array
 * @return { array } - randomly sorted array
 */
const randomArray = (arr, amount) => {
  amount = amount || 1;
  const randoms = [];

  for (let i = 0; i < amount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  return amount === 1 ? randoms[0] : randoms;
};
/**
 * Randomly sorts an arrays items
 * @param  { array } arr - array to randomly sorted
 * @return { array } - randomly sorted array
 */


exports.randomArray = randomArray;

const randomizeArray = arr => arr.sort(() => 0.5 - Math.random());
/**
 * Removes duplicates from an array
 * @param  { array } arr - array to remove duplicates from
 * @return { array } - copy of passed in array, with duplicates removed
 */


exports.randomizeArray = randomizeArray;

const uniqArr = arr => isArr(arr) && arr.filter((e, i, arr) => arr.indexOf(e) == i) || arr;
/**
 * Checks if passed in value is an array
 * @param  { any } value - value to be check if is an array
 * @return { boolean } - T/F value is an array
 */


exports.uniqArr = uniqArr;

const isArr = value => Array.isArray(value);
/**
 * Creates a copy of the passed in array. Returns empty array, if param is not an array
 * @param  { array } arr - array to be copied
 * @return { array } - copy of passed in array
 */


exports.isArr = isArr;

const cloneArr = arr => Array.from([...(isArr(arr) && arr || [])]);

exports.cloneArr = cloneArr;