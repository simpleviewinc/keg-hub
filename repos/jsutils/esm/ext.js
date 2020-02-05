/** @module Helpers */
'use strict';

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.trim");

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

var either = function either(val1, val2, check) {
  return !(0, _method.isFunc)(check) ? (0, _boolean.softFalsy)(val1) && val1 || val2 : check(val1, val2) && val1 || val2;
};
/**
 * Gets the type of the passed in val.
 * @example
 * typeOf(1)
 * // Returns Number
 * @example
 * typeOf('')
 * // Returns String
 * @function
 * @param {*} val - value to get type for
 * @return {string} type of the value
 */


exports.either = either;

var typeOf = function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};
/**
 * Checks if the passed in values are exactly the same.
 * @example
 * isSame(1, 1)
 * // Returns true
 * @function
 * @param {*} val1 - value to compare
 * @param {*} val2 - value to compare
 * @return {boolean} is the values are the same
 */


exports.typeOf = typeOf;

var isSame = function isSame(val1, val2) {
  return val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;
};
/**
 * Checks if the value is empty.
 * @example
 * isEmpty('')
 * // Returns true
 * @example
 * isEmpty({})
 * // Returns true
 * @example
 * isEmpty([ 1 ])
 * // Returns false
 * @function
 * @param { object | array | number | string } val - value to check
 * @return {boolean} if the value is empty
 */


exports.isSame = isSame;

var isEmpty = function isEmpty(val) {
  return (0, _object.isObj)(val) ? Object.keys(val).length === 0 : (0, _array.isArr)(val) ? val.length === 0 : (0, _string.isStr)(val) ? val.trim().length === 0 : (0, _number.isNum)(val) ? val < 1 : false;
};
/**
 * Checks is passed in date is a valid date.
 * @example
 * isValidDate(new Date())
 * // Returns true
 * @example
 * isValidDate(new Date().toString())
 * // Returns true
 * @example
 * isValidDate('12345678')
 * // Returns false
 * @function
 * @param { date | string } date - value to check
 * @return {boolean} T/F - if passed in date is a valid date
 */


exports.isEmpty = isEmpty;

var isValidDate = function isValidDate(date) {
  return !isNaN((date instanceof Date && date || new Date(date)).getTime());
};
/**
 * Converts a string to its own type if possible.
 * @example
 * strToType('12345678')
 * // Returns 12345678
 * @example
 * strToType('{}')
 * // Returns {}
 * @example
 * strToType('[]')
 * // Returns []
 * @function
 * @param {*} val - value to convert
 * @return { any | string } converted value || string if can't convert
 */


exports.isValidDate = isValidDate;

var strToType = function strToType(val) {
  return !val || !(0, _string.isStr)(val) ? val : (0, _boolean.isStrBool)(val) ? (0, _boolean.toBool)(val) : (0, _number.isNum)(val) ? (0, _number.toNum)(val) : function () {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }();
};

exports.strToType = strToType;