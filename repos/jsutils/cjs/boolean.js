/** @module boolean */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBool = exports.softFalsy = exports.convertToStrBool = exports.isStrBool = exports.isBool = void 0;

var _string = require("./string");

const isBool = val => typeof val === 'boolean';
/**
 * Checks is value is a boolean as a string.
 * @function
 * @example
 * isStrBool("true")
 * // Returns true
 * @example
 * isStrBool(true)
 * // Returns false
 * @param {*} val - value to check if boolean as a string
 * @return {boolean} T/F - if value is a boolean
 */


exports.isBool = isBool;

const isStrBool = val => val === 'false' || val === 'true';
/**
 * Converts a value to a boolean as a string.
 * @function
 * @example
 * convertToStrBool(true)
 * // Returns 'true'
 * @param {*} val - value to convert
 * @return {string} 'true' || 'false' based on passed in value
 */


exports.isStrBool = isStrBool;

const convertToStrBool = val => isBool(val) ? (0, _string.toStr)(val) : !val || val === 'false' || val === '0' ? 'false' : 'true';
/**
 * Checks if a value is falsy, excluding empty string and 0.
 * @function
 * @example
 * softFalsy('')
 * // Returns true
 * @example
 * softFalsy(0)
 * // Returns true
 * @example
 * softFalsy(null)
 * // Returns false
 * @param {*} val - value to check
 * @return {boolean} T/F based on passed in value
 */


exports.convertToStrBool = convertToStrBool;

const softFalsy = val => Boolean(val || val === '' || val === 0);
/**
 * Converts a value to a boolean.
 * @function
 * @example
 * toBool(null)
 * // Returns false
 * @example
 * toBool('false')
 * // Returns false
 * @example
 * toBool('true')
 * // Returns true
 * @param {*} val - value to convert
 * @return {boolean} true or false based on passed in value.
 */


exports.softFalsy = softFalsy;

const toBool = val => isStrBool(val) ? val === 'true' : convertToStrBool(val) === 'true';

exports.toBool = toBool;