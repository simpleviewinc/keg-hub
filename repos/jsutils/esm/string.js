'use strict';
/**
 * Converts a string to camel case
 * @param  { string } string to be converted
 * @return { string } - string in camel case format
 */

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordCaps = exports.trainCase = exports.styleCase = exports.singular = exports.sanitize = exports.removeDot = exports.plural = exports.parseJSON = exports.isUuid = exports.isUrl = exports.isStr = exports.isPhone = exports.isEmail = exports.capitalize = exports.clean = exports.camelCase = void 0;

var camelCase = function camelCase(str, compCase) {
  return str && clean(str).split(' ').map(function (word, index) {
    return (index > 0 || compCase) && capitalize(word) || word.toLowerCase();
  }).join('') || str;
};
/**
 * Converts `-` and `_` to white space and removes `.`
 * @param  { string } string to be converted
 * @return { string } - cleaned string
 */


exports.camelCase = camelCase;

var clean = function clean(str) {
  if (!str) return str;
  return removeDot(str).replace(/_/g, ' ').replace(/-/g, ' ');
};
/**
 * Converts first letter of a string to be capitalized
 * @param  { string } string
 * @return { string } - Passed in string, but capitalized
 */


exports.clean = clean;

var capitalize = function capitalize(str) {
  return isStr(str) && str[0] && "".concat(str[0].toUpperCase()).concat(str.slice(1).toLowerCase()) || str;
};
/**
 * Check if string is a email
 * @param  { string } string to check
 * @return { boolean } - if it's a email
 */


exports.capitalize = capitalize;

var isEmail = function isEmail(str) {
  if (!str || typeof str !== 'string') return false;
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return Boolean(regex.test(str));
};
/**
 * Check if string is a phone number
 * @param  { string } string to check
 * @return { boolean } - if it's a phone number
 */


exports.isEmail = isEmail;

var isPhone = function isPhone(str) {
  if (!str || typeof str !== 'string') return false;
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11;
};
/**
 * Check if data is a string
 * @param  { all } str - param to check if type is a string 
 * @return { boolean } - if it's a string
 */


exports.isPhone = isPhone;

var isStr = function isStr(str) {
  return typeof str === 'string';
};
/**
 * Check if string is a url
 * @param  { string } string to check
 * @return { boolean } - if it's a url
 */


exports.isStr = isStr;

var isUrl = function isUrl(str) {
  var regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return Boolean(regex.test(str));
};
/**
 * Check if string is a uuid
 * @param  { string } string to check
 * @return { boolean } - if it's a uuid
 */


exports.isUrl = isUrl;

var isUuid = function isUuid(str) {
  if (!str || typeof str !== 'string') return false;
  var regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return Boolean(regex.test(str));
};
/**
 * Convert JSON string into object, wrapped in a try / catch
 * @param  { string } string
 * @return { object } - JSON object
 */


exports.isUuid = isUuid;

var parseJSON = function parseJSON(str) {
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

var plural = function plural(str) {
  if (!str || !str.length) return str;
  return str[str.length - 1] !== 's' ? str + 's' : str;
};
/**
 * Removes a `.` from the start and end of a string
 * @param  { string } str - string to convert
 * @return { string } - string without the `.`
 */


exports.plural = plural;

var removeDot = function removeDot(string) {
  var noDot = string.indexOf('.') === 0 ? string.slice(1) : string;
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot;
};
/**
 * Sanitize a string of HTML content
 * @param  { string } string
 * @return { string } - cleaned string
 */


exports.removeDot = removeDot;

var sanitize = function sanitize(str) {
  return isStr(str) && str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || str;
};
/**
 * Remove an `s` at the end of a string, if the last char is an `s`
 * @param  { string } str - string to convert
 * @return { string } string as singular
 */


exports.sanitize = sanitize;

var singular = function singular(str) {
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

var styleCase = function styleCase(str) {
  str = str.split(/[\s,-]/);
  str = str.map(capitalize);
  str[0] = str[0].toLowerCase();
  return str.join('');
};
/**
 * Converts a string to train case
 * @param  { string } string to be converted
 * @return { string } - string in train case format
 */


exports.styleCase = styleCase;

var trainCase = function trainCase(str) {
  return isStr(str) && str.replace(/ /g, '-').toLowerCase() || str;
};
/**
 * Converts all words in a string to be capitalized
 * @param  { string } string to be converted
 * @return { string } - string with all words capitalized
 */


exports.trainCase = trainCase;

var wordCaps = function wordCaps(str) {
  if (!str) return str;
  var cleaned = clean(str);
  return cleaned.split(' ').map(function (word) {
    return capitalize(word);
  }).join(' ');
};

exports.wordCaps = wordCaps;