'use strict';
/**
 * Builds a string path from passed in args ( i.e. path/to/thing )
 * @return { string } - built path from arguments
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordCaps = exports.toStr = exports.trainCase = exports.styleCase = exports.singular = exports.sanitize = exports.removeDot = exports.plural = exports.parseJSON = exports.isUuid = exports.isUrl = exports.isStr = exports.isPhone = exports.isEmail = exports.eitherStr = exports.containsStr = exports.capitalize = exports.cleanStr = exports.camelCase = exports.buildPath = void 0;

const buildPath = (...args) => {
  const built = args.reduce((path, arg) => {
    let str = toStr(arg);
    return `${path}${str && '/' + str || ''}`;
  }, '');
  return built.replace(/([^:\/]|^)\/{2,}/g, '$1/');
};
/**
 * Converts a string to camel case
 * @param  { string } string to be converted
 * @return { string } - string in camel case format
 */


exports.buildPath = buildPath;

const camelCase = (str, compCase) => {
  return str && cleanStr(str).split(/[\s_-]/gm).reduce((cased, word, index) => {
    if (!word) return cased;
    cased += (index > 0 || compCase) && capitalize(word) || word.toLowerCase();
    return cased;
  }, '') || str;
};
/**
 * Converts `-` and `_` to white space and removes `.`
 * @param  { string } string to be converted
 * @return { string } - cleaned string
 */


exports.camelCase = camelCase;

const cleanStr = str => {
  return str && removeDot(str).replace(/[-_]/gm, ' ') || str;
};
/**
 * Converts first letter of a string to be capitalized
 * @param  { string } string
 * @return { string } - Passed in string, but capitalized
 */


exports.cleanStr = cleanStr;

const capitalize = str => isStr(str) && str[0] && `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}` || str;
/**
 * Checks if a string contains another string
 * @param  { string } string - value to be checked
 * @param  { string } substring - value to search for
 * 
 * @return { boolean } - if the substring exists string
 */


exports.capitalize = capitalize;

const containsStr = (str, substring, fromIndex) => {
  str = !isStr(str) && toStr(str) || str;
  substring = !isStr(substring) && toStr(substring) || substring;
  return str.indexOf(substring, fromIndex) !== -1;
};
/**
 * Returns the first param if correct type of second param
 * @param { string } str1 - return if is string
 * @param { string } str2 - use if first is not an object
 * @returns { string }
 */


exports.containsStr = containsStr;

const eitherStr = (str1, str2) => isStr(str1) && str1 || str2;
/**
 * Check if string is a email
 * @param  { string } string to check
 * @return { boolean } - if it's a email
 */


exports.eitherStr = eitherStr;

const isEmail = str => {
  if (!str || !isStr(str)) return false;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return Boolean(regex.test(str));
};
/**
 * Check if string is a phone number
 * @param  { string } string to check
 * @return { boolean } - if it's a phone number
 */


exports.isEmail = isEmail;

const isPhone = str => {
  if (!str || !isStr(str)) return false;
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11;
};
/**
 * Check if data is a string
 * @param  { all } str - param to check if type is a string 
 * @return { boolean } - if it's a string
 */


exports.isPhone = isPhone;

const isStr = str => typeof str === 'string';
/**
 * Check if string is a url
 * @param  { string } string to check
 * @return { boolean } - if it's a url
 */


exports.isStr = isStr;

const isUrl = str => {
  const regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return Boolean(regex.test(str));
};
/**
 * Check if string is a uuid
 * @param  { string } string to check
 * @return { boolean } - if it's a uuid
 */


exports.isUrl = isUrl;

const isUuid = str => {
  if (!str || !isStr(str)) return false;
  const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return Boolean(regex.test(str));
};
/**
 * Convert JSON string into object, wrapped in a try / catch
 * @param  { string } string
 * @return { object } - JSON object
 */


exports.isUuid = isUuid;

const parseJSON = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error(e.message);
    return null;
  }
};
/**
 * Adds an `s` to the end of a string, if one does not exist
 * @param  { string } str - string to convert
 * @return { string } string as a plural
 */


exports.parseJSON = parseJSON;

const plural = str => {
  if (!str || !str.length) return str;
  return str[str.length - 1] !== 's' ? str + 's' : str;
};
/**
 * Removes a `.` from the start and end of a string
 * @param  { string } str - string to convert
 * @return { string } - string without the `.`
 */


exports.plural = plural;

const removeDot = string => {
  const noDot = string.indexOf('.') === 0 ? string.slice(1) : string;
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot;
};
/**
 * Sanitize a string of HTML content
 * @param  { string } string
 * @return { string } - cleaned string
 */


exports.removeDot = removeDot;

const sanitize = str => isStr(str) && str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || str;
/**
 * Remove an `s` at the end of a string, if the last char is an `s`
 * @param  { string } str - string to convert
 * @return { string } string as singular
 */


exports.sanitize = sanitize;

const singular = str => {
  if (!str || !str.length) return str;
  return str[str.length - 1] === 's' ? str.slice(0, str.length - 1) : str;
};
/**
 * Converts a string to css in js format
 * Useful for converting css rules into js format, I.E. margin-top => marginTop
 * @param  { string } str - string to be converted
 * @return { string } - string in style case format
 */


exports.singular = singular;

const styleCase = str => {
  if (!isStr) return str;
  const cased = camelCase(str);
  return `${cased[0].toLowerCase()}${cased.slice(1)}`;
};
/**
 * Converts a string to train case
 * @param  { string } string to be converted
 * @return { string } - string in train case format
 */


exports.styleCase = styleCase;

const trainCase = str => isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join('-').toLowerCase() || str;
/**
 * Converts a passed in value to a string
 * @param  { any } val - value to be converted
 * 
 * @return { string } - value converted into a string
 */


exports.trainCase = trainCase;

const toStr = val => val === null || val === undefined ? '' : isStr(val) ? val : JSON.stringify(val);
/**
 * Converts all words in a string to be capitalized
 * @param  { string } string to be converted
 * @return { string } - string with all words capitalized
 */


exports.toStr = toStr;

const wordCaps = str => {
  if (!str) return str;
  let cleaned = cleanStr(str);
  return cleaned.split(' ').map(word => word && capitalize(word) || '').join(' ');
};

exports.wordCaps = wordCaps;