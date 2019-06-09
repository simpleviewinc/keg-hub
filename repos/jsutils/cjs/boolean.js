"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBool = exports.softFalsy = exports.convertToStrBool = exports.isStrBool = exports.isBool = void 0;

var _string = require("./string");

/**
 * Checks is value is a boolean
 * @param  { any } val - value to check if is a number
 * @return { boolean } T/F - if value is a boolean
 */
const isBool = val => typeof val === 'boolean';
/**
 * Checks is value is a boolean as a string
 * @param  { any } val - value to check if boolean as a string
 * @return { boolean } T/F - if value is a boolean
 */


exports.isBool = isBool;

const isStrBool = val => val === 'false' || val === 'true';
/**
 * Converts a value to a boolean as a string
 * @param  { any } val - value to convert
 * @return { string } 'true' || 'false' based on passed in value
 */


exports.isStrBool = isStrBool;

const convertToStrBool = val => isBool(val) ? (0, _string.toStr)(val) : !val || val === 'false' || val === '0' ? 'false' : 'true';
/**
 * Checks if a value is falsy, excluding empty string and 0
 * @param  { any } val - value to check
 * @return { boolean } T/F based on passed in value
 */


exports.convertToStrBool = convertToStrBool;

const softFalsy = val => Boolean(val || val === '' || val === 0);
/**
 * Converts a value to a boolean
 * @param  { any } val - value to convert
 * @return { boolean } T/F based on passed in value
 */


exports.softFalsy = softFalsy;

const toBool = val => isStrBool(val) ? val === 'true' : convertToStrBool(val) === 'true';

exports.toBool = toBool;