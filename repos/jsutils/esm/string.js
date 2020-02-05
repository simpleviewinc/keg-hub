/** @module string */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLowerCase = exports.isUpperCase = exports.wordCaps = exports.toStr = exports.trainCase = exports.styleCase = exports.singular = exports.sanitize = exports.removeDot = exports.plural = exports.parseJSON = exports.isUuid = exports.isUrl = exports.isStr = exports.isPhone = exports.isEmail = exports.eitherStr = exports.containsStr = exports.capitalize = exports.cleanStr = exports.camelCase = exports.mapString = exports.delimitString = exports.snakeCase = exports.buildPath = void 0;

var _method = require("./method");

var buildPath = function buildPath() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var built = args.reduce(function (path, arg) {
    var str = toStr(arg);
    return "".concat(path).concat(str && '/' + str || '');
  }, '');
  return built.replace(/([^:\/]|^)\/{2,}/g, '$1/');
};
/**
 * Converts a string to snake_case.
 * @function
 * @param {string} str to be converted
 * @example
 *  snakeCase('fooBar') // returns 'foo_bar'
 * @returns the string in snake_case, or the input if it is not a string
 */


exports.buildPath = buildPath;

var snakeCase = function snakeCase(str) {
  var underscored = delimitString(str, '_');
  return underscored.toLowerCase();
};
/**
 * @function
 * @returns a new string with the specified delimiter delimiting each word
 * @param {String} str - string of any casing
 * @param {String} delimiter - e.g. '_'
 * @param {Array} delimiters - optional. An array of delimiter characters on which this function searches and breaks. Defaults to checking -, _, and space
 * @example delimitString('fooBar', '_') // 'foo_Bar'
 */


exports.snakeCase = snakeCase;

var delimitString = function delimitString(str, delimiter) {
  var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['-', '_', ' '];
  if (!isStr(str)) return str;

  var isDelimiter = function isDelimiter(c) {
    return delimiters.some(function (del) {
      return del === c;
    });
  };

  var prevChar = '_';
  return mapString(str, function (_char) {
    if (isDelimiter(_char)) {
      prevChar = delimiter;
      return delimiter;
    }

    if (isUpperCase(_char) && isLowerCase(prevChar) && !isDelimiter(prevChar)) {
      prevChar = _char;
      return delimiter + _char;
    }

    prevChar = _char;
    return _char;
  });
};
/**
 * Maps a string by applying function `charMapper` to each character.
 * @function
 * @param {string} str to be mapped
 * @param {Function} charMapper - function of form (character) => <some character or string>
 * @returns a new string, with each character mapped by charMap. If str is not a string or charMapper not a function, just returns str
 * @example
 *  mapString("hello", c => c === 'h' ? 'x' : c) // returns 'xello'
 */


exports.delimitString = delimitString;

var mapString = function mapString(str, charMapper) {
  if (!isStr(str)) return str;
  if (!(0, _method.isFunc)(charMapper)) return str;
  var result = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _char2 = _step.value;
      result += charMapper(_char2);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};
/**
 * Converts a string to camel case.
 * @function
 * @param {string} string to be converted
 * @return {string} - string in camel case format
 */


exports.mapString = mapString;

var camelCase = function camelCase(str, compCase) {
  return str && cleanStr(str).split(/[\s_-]/gm).reduce(function (cased, word, index) {
    if (!word) return cased;
    cased += (index > 0 || compCase) && capitalize(word) || word.toLowerCase();
    return cased;
  }, '') || str;
};
/**
 * Converts `-` and `_` to white space and calls remove removeDot, to remove a period.
 * @function
 * @param {string} string to be converted
 * @return {string} - cleaned string
 */


exports.camelCase = camelCase;

var cleanStr = function cleanStr(str) {
  return str && removeDot(str).replace(/[-_]/gm, ' ') || str;
};
/**
 * Converts first letter of a string to be capitalized.
 * @function
 * @param {string} string
 * @return {string} - Passed in string, but capitalized
 */


exports.cleanStr = cleanStr;

var capitalize = function capitalize(str) {
  return isStr(str) && str[0] && "".concat(str[0].toUpperCase()).concat(str.slice(1).toLowerCase()) || str;
};
/**
 * Checks if a string contains another string.
 * @function
 * @param {string} string - value to be checked
 * @param {string} substring - value to search for
 * @return {boolean} - if the substring exists string
 */


exports.capitalize = capitalize;

var containsStr = function containsStr(str, substring, fromIndex) {
  str = !isStr(str) && toStr(str) || str;
  substring = !isStr(substring) && toStr(substring) || substring;
  return str.indexOf(substring, fromIndex) !== -1;
};
/**
 * Checks if the first param is a string, and returns it.
 * <br> If it's not a string, the second param is returned
 * @function
 * @param {string} str1 - return if is string
 * @param {string} str2 - use if first is not a string
 * @returns {string}
 */


exports.containsStr = containsStr;

var eitherStr = function eitherStr(str1, str2) {
  return isStr(str1) && str1 || str2;
};
/**
 * Check if string is a email.
 * @function
 * @param {string} string to check
 * @return {boolean} - if it's a email
 */


exports.eitherStr = eitherStr;

var isEmail = function isEmail(str) {
  if (!str || !isStr(str)) return false;
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return Boolean(regex.test(str));
};
/**
 * Check if string is a phone number.
 * @function
 * @param {string} string to check
 * @return {boolean} - if it's a phone number
 */


exports.isEmail = isEmail;

var isPhone = function isPhone(str) {
  if (!str || !isStr(str)) return false;
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11;
};
/**
 * Check if passed in value is a string.
 * @function
 * @param { all } str - param to check if type is a string 
 * @return {boolean} - if it's a string
 */


exports.isPhone = isPhone;

var isStr = function isStr(str) {
  return typeof str === 'string';
};
/**
 * Check if string is a url.
 * @function
 * @param {string} string to check
 * @return {boolean} - if it's a url
 */


exports.isStr = isStr;

var isUrl = function isUrl(str) {
  var regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return Boolean(regex.test(str));
};
/**
 * Check if string is a uuid.
 * @function
 * @param {string} string to check
 * @return {boolean} - if it's a uuid
 */


exports.isUrl = isUrl;

var isUuid = function isUuid(str) {
  if (!str || !isStr(str)) return false;
  var regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return Boolean(regex.test(str));
};
/**
 * Convert JSON string into object, wrapped in a try / catch.
 * @function
 * @param {string} string
 * @return {Object} - JSON object
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
 * Adds an `s` to the end of a string, if one does not exist.
 * @function
 * @param {string} str - string to convert
 * @return {string} string as a plural
 */


exports.parseJSON = parseJSON;

var plural = function plural(str) {
  if (!str || !str.length) return str;
  return str[str.length - 1] !== 's' ? str + 's' : str;
};
/**
 * Removes a `.` from the start and end of a string.
 * @function
 * @param {string} str - string to convert
 * @return {string} - string without the `.`
 */


exports.plural = plural;

var removeDot = function removeDot(string) {
  var noDot = string.indexOf('.') === 0 ? string.slice(1) : string;
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot;
};
/**
 * Sanitize a string of HTML content.
 * @function
 * @param {string} string
 * @return {string} - cleaned string
 */


exports.removeDot = removeDot;

var sanitize = function sanitize(str) {
  return isStr(str) && str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || str;
};
/**
 * Remove an `s` at the end of a string, if the last char is an `s`,
 * @function
 * @param {string} str - string to convert
 * @return {string} string as singular
 */


exports.sanitize = sanitize;

var singular = function singular(str) {
  if (!str || !str.length) return str;
  return str[str.length - 1] === 's' ? str.slice(0, str.length - 1) : str;
};
/**
 * Converts a string to css in js format.
 * Useful for converting css rules into js format, I.E. margin-top => marginTop.
 * @function
 * @param {string} str - string to be converted
 * @return {string} - string in style case format
 */


exports.singular = singular;

var styleCase = function styleCase(str) {
  if (!isStr) return str;
  var cased = camelCase(str);
  return "".concat(cased[0].toLowerCase()).concat(cased.slice(1));
};
/**
 * Converts a string to train case, I.E. marginTop => margin-top.
 * @function
 * @param {string} string to be converted
 * @return {string} - string in train case format
 */


exports.styleCase = styleCase;

var trainCase = function trainCase(str) {
  return isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join('-').toLowerCase() || str;
};
/**
 * Converts a passed in value to a string.
 * @function
 * @param {*} val - value to be converted
 * @return {string} - value converted into a string
 */


exports.trainCase = trainCase;

var toStr = function toStr(val) {
  return val === null || val === undefined ? '' : isStr(val) ? val : JSON.stringify(val);
};
/**
 * Converts all words in a string to be capitalized.
 * @function
 * @param {string} string to be converted
 * @return {string} - string with all words capitalized
 */


exports.toStr = toStr;

var wordCaps = function wordCaps(str) {
  if (!str) return str;
  var cleaned = cleanStr(str);
  return cleaned.split(' ').map(function (word) {
    return word && capitalize(word) || '';
  }).join(' ');
};
/**
 * @function
 * @returns true if str is upper case
 * @param {String} str 
 */


exports.wordCaps = wordCaps;

var isUpperCase = function isUpperCase(str) {
  return str === str.toUpperCase();
};
/**
 * @function
 * @returns true if str is upper case
 * @param {String} str 
 */


exports.isUpperCase = isUpperCase;

var isLowerCase = function isLowerCase(str) {
  return str === str.toLowerCase();
};

exports.isLowerCase = isLowerCase;