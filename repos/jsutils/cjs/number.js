"use strict";

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNum = exports.toInt = exports.toFloat = exports.nth = exports.isNum = exports.isInt = exports.isFloat = exports.getNums = exports.equalsNaN = void 0;

var _string = require("./string");

/**
 * Checks if a value is NaN
 * @param  { number } val - value to check if is NaN
 * @return { boolean } T/F - if value is a number
 */
const equalsNaN = val => typeof val === 'number' && val != val;
/**
 * Gets numbers and floats (.) from a string
 * @param  { any } val - value to pull numbers from
 * @return { string } Numbers found in value
 */


exports.equalsNaN = equalsNaN;

const getNums = val => (0, _string.toStr)(val).replace(/([^.\d])/gm, '');
/**
 * Checks if a number is a Float
 * @param  { number } num - value to check
 * @return { boolean } T/F - value is an Float
 */


exports.getNums = getNums;

const isFloat = val => isNum(val) && val % 1 !== 0;
/**
 * Checks if a number is an Int
 * @param  { number } num - value to check
 * @return { boolean } T/F - value is an Int
 */


exports.isFloat = isFloat;

const isInt = val => isNum(val) && val % 1 === 0;
/**
 * Checks is value is a number
 * @param  { number } val - value to check if is a number
 * @return { boolean } T/F - if value is a number
 */


exports.isInt = isInt;

const isNum = val => typeof val === 'number' && !equalsNaN(val);
/**
 * Finds the number ext base on the passed in numb
 * @param  { number } num - value to check
 * @return { string } ext of the number
 */


exports.isNum = isNum;

const nth = num => {
  if (!isNum(num)) {
    num = getNums(num);
    if (!num) return '';
    num = toNum(num);
    if (equalsNaN(num)) return '';
  }

  const mod = num % 100;
  if (mod >= 10 && mod <= 20) return 'th';

  switch (num % 10) {
    case 1:
      return 'st';

    case 2:
      return 'nd';

    case 3:
      return 'rd';

    default:
      return 'th';
  }
};
/**
 * Converts passed in value to an Int
 * @param  { any } val - value to convert
 * @return { number } value converted to an Int
 */


exports.nth = nth;

const toFloat = val => val && !equalsNaN(val) && parseFloat(isNum(val) && val || getNums(val)) || 0;
/**
 * Converts passed in value to a float
 * @param  { any } val - value to convert
 * @return { number } value converted to a float
 */


exports.toFloat = toFloat;

const toInt = val => val && !equalsNaN(val) && parseInt(isNum(val) && val || getNums(val)) || 0;
/**
 * Converts passed in value to a number
 * @param  { any } val - value to convert
 * @return { number } value converted to a float
 */


exports.toInt = toInt;

const toNum = val => isNum(val) ? val : val && !equalsNaN(val) && Number(getNums(val)) || 0;

exports.toNum = toNum;