"use strict";

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
exports.strToType = exports.isValidDate = exports.isEmpty = exports.isSame = exports.typeOf = void 0;

var _object = require("./object");

var _array = require("./array");

var _string = require("./string");

var _number = require("./number");

var _boolean = require("./boolean");

/**
 * Gets the type of the passed in val
 * @param  { any } val - value to get type for
 * @return { string } type of the value
 */
var typeOf = function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};
/**
 * Checks if the passed in values are exactly the same
 * @param  { any } d1 - value to compare
 * @param  { any } d1 - value to compare
 * @return { boolean } is the values are the same
 */


exports.typeOf = typeOf;

var isSame = function isSame(d1, d2) {
  return d1 === d2 ? d1 !== 0 || 1 / d1 === 1 / d2 : d1 !== d1 && d2 !== d2;
};
/**
 * Checks if the value is empty
 * @param  { object | array | number | string } val - value to check
 * @return { boolean } if the value is empty
 */


exports.isSame = isSame;

var isEmpty = function isEmpty(val) {
  return (0, _object.isObj)(val) ? Object.keys(val).length === 0 : (0, _array.isArr)(val) ? val.length === 0 : (0, _string.isStr)(val) ? val.trim().length === 0 : (0, _number.isNum)(val) ? val < 1 : false;
};

exports.isEmpty = isEmpty;

var isValidDate = function isValidDate(date) {
  return !isNaN((date instanceof Date && date || new Date(date)).getTime());
};
/**
 * Converts a string to its own type if possible
 * @param  { any } val - value to convert
 * @return { any | string } converted value || string if can't convert
 */


exports.isValidDate = isValidDate;

var strToType = function strToType(val) {
  return !val || !(0, _string.isStr)(val) ? val : (0, _boolean.isStrBool)(val) ? (0, _boolean.toBool)(val) : function () {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }();
};

exports.strToType = strToType;