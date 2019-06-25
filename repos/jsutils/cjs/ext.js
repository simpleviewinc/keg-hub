"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strToType = exports.isValidDate = exports.isEmpty = exports.isSame = exports.typeOf = exports.either = void 0;

var _object = require("./object");

var _array = require("./array");

var _string = require("./string");

var _number = require("./number");

var _boolean = require("./boolean");

var _method = require("./method");

/**
 * Determines the correct data to return
 * @param { any } func1 - return if passes check method
 * @param { any } func2 - use if first is not an object
 * @returns { any }
 */
const either = (data1, data2, check) => !(0, _method.isFunc)(check) ? (0, _boolean.softFalsy)(data1) && data1 || data2 : check(data1) && data1 || data2;
/**
 * Gets the type of the passed in val
 * @param  { any } val - value to get type for
 * @return { string } type of the value
 */


exports.either = either;

const typeOf = val => Object.prototype.toString.call(val).slice(8, -1);
/**
 * Checks if the passed in values are exactly the same
 * @param  { any } val1 - value to compare
 * @param  { any } val2 - value to compare
 * @return { boolean } is the values are the same
 */


exports.typeOf = typeOf;

const isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
/**
 * Checks if the value is empty
 * @param  { object | array | number | string } val - value to check
 * @return { boolean } if the value is empty
 */


exports.isSame = isSame;

const isEmpty = val => (0, _object.isObj)(val) ? Object.keys(val).length === 0 : (0, _array.isArr)(val) ? val.length === 0 : (0, _string.isStr)(val) ? val.trim().length === 0 : (0, _number.isNum)(val) ? val < 1 : false;
/**
 * Checks is passed in date is a valid date
 * @param  { date || string } date - value to check
 * @return { boolean } T/F - if passed in date is a valid date
 */


exports.isEmpty = isEmpty;

const isValidDate = date => !isNaN((date instanceof Date && date || new Date(date)).getTime());
/**
 * Converts a string to its own type if possible
 * @param  { any } val - value to convert
 * @return { any | string } converted value || string if can't convert
 */


exports.isValidDate = isValidDate;

const strToType = val => {
  return !val || !(0, _string.isStr)(val) ? val : (0, _boolean.isStrBool)(val) ? (0, _boolean.toBool)(val) : (() => {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  })();
};

exports.strToType = strToType;