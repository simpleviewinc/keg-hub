'use strict';

var isArr = require('./isArr-39234014.js');
var isFunc = require('./isFunc-f93803cb.js');
var isStr = require('./isStr-8a57710e.js');
var toStr$1 = require('./toStr-8e499966.js');
var isNonNegative = require('./isNonNegative-9959647c.js');
var isColl = require('./isColl-5757310a.js');
var get = require('./get-bfcf4646.js');

const buildPath = (...args) => {
  const built = args.reduce((path, arg) => {
    let str = toStr(arg);
    return `${path}${str && '/' + str || ''}`;
  }, '');
  return built.replace(/([^:\/]|^)\/{2,}/g, '$1/');
};

const mapString = (str, charMapper) => {
  if (!isStr.isStr(str)) return str;
  if (!isFunc.isFunc(charMapper)) return str;
  let result = "";
  for (const char of str) {
    result += charMapper(char);
  }
  return result;
};

const isLowerCase = str => str === str.toLowerCase();

const isUpperCase = str => str === str.toUpperCase();

const delimitString = (str, delimiter, delimiters = ['-', '_', ' ']) => {
  if (!isStr.isStr(str)) return str;
  const isDelimiter = c => delimiters.some(del => del === c);
  let prevChar = '_';
  return mapString(str, char => {
    if (isDelimiter(char)) {
      prevChar = delimiter;
      return delimiter;
    }
    if (isUpperCase(char) && isLowerCase(prevChar) && !isDelimiter(prevChar)) {
      prevChar = char;
      return delimiter + char;
    }
    prevChar = char;
    return char;
  });
};

const snakeCase = str => {
  const underscored = delimitString(str, '_');
  return underscored.toLowerCase();
};

const capitalize = (str, lowercaseTail = true) => {
  if (!isStr.isStr(str) || !str[0]) return str;
  const tail = lowercaseTail ? str.slice(1).toLowerCase() : str.slice(1);
  return `${str[0].toUpperCase()}${tail}`;
};

const removeDot = string => {
  const noDot = string.indexOf('.') === 0 ? string.slice(1) : string;
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot;
};

const cleanStr = str => {
  return str && removeDot(str).replace(/[-_]/gm, ' ') || str;
};

const camelCase = (str, compCase) => {
  return str && cleanStr(str).split(/[\s_-]/gm).reduce((cased, word, index) => {
    if (!word) return cased;
    cased += (index > 0 || compCase) && capitalize(word) || word.toLowerCase();
    return cased;
  }, '') || str;
};

const camelCasePath = path => {
  const split = path.split('.');
  const camelCasedSplit = split.map((str, idx) => idx > 0 ? capitalize(str, false) : str);
  return camelCasedSplit.length > 1 ? camelCasedSplit.join('') : path;
};

const containsStr = (str, substring, fromIndex) => {
  str = !isStr.isStr(str) && toStr$1.toStr(str) || str;
  substring = !isStr.isStr(substring) && toStr$1.toStr(substring) || substring;
  return str.indexOf(substring, fromIndex) !== -1;
};

const eitherStr = (str1, str2) => isStr.isStr(str1) && str1 || str2;

const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const hyphenCache = {};
const toHyphenLower = match => '-' + match.toLowerCase();
const hyphenator = rule => {
  if (hyphenCache.hasOwnProperty(rule)) return hyphenCache[rule];
  const hRule = rule.replace(uppercasePattern, toHyphenLower);
  return hyphenCache[rule] = msPattern.test(hRule) ? '-' + hRule : hRule;
};

const hashString = (str, maxLength) => {
  if (!isStr.isStr(str) || str.length == 0) return 0;
  str = str.split('').reverse().join('');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = `${Math.abs(hash & hash)}`;
  }
  return isNonNegative.isNonNegative(maxLength) ? hash.slice(0, maxLength) : hash;
};

const isEmail = str => {
  if (!str || !isStr.isStr(str)) return false;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return Boolean(regex.test(str));
};

const isPhone = str => {
  if (!str || !isStr.isStr(str)) return false;
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11;
};

const isUrl = str => {
  const regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return Boolean(regex.test(str));
};

const isUuid = str => {
  if (!str || !isStr.isStr(str)) return false;
  const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return Boolean(regex.test(str));
};

const parseJSON = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

const plural = str => {
  if (!str || !str.length) return str;
  return str[str.length - 1] !== 's' ? str + 's' : str;
};

const singular = str => {
  if (!str || !str.length) return str;
  return str[str.length - 1] === 's' ? str.slice(0, str.length - 1) : str;
};

const styleCase = str => {
  if (!isStr.isStr(str)) return str;
  const cased = camelCase(str);
  return `${cased[0].toLowerCase()}${cased.slice(1)}`;
};

const trainCase = str => isStr.isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join('-').toLowerCase() || str;

const wordCaps = str => {
  if (!isStr.isStr(str)) return str;
  let cleaned = cleanStr(str);
  return cleaned.split(' ').map(word => word && capitalize(word) || '').join(' ');
};

const spaceJoin = (original, toAdd) => {
  toAdd = isArr.isArr(toAdd) ? toAdd : [toAdd];
  return toAdd.reduce((joined, item) => {
    return isStr.isStr(item) ? `${joined ? joined + ' ' : ''}${item}`.trim() : joined;
  }, isStr.isStr(original) ? original : '');
};

const template = (tempStr, data, fallback = '') => {
  data = isColl.isColl(data) && data || {};
  const regex = template.regex || /\${([^{]+[^}])}/g;
  return isStr.isStr(tempStr) ? tempStr.replace(regex, (match, exact) => {
    const path = (exact || match.substr(2, match.length - 3)).trim();
    const replaceWith = get.get(data, path, fallback);
    return isFunc.isFunc(replaceWith) ? replaceWith(data, path, fallback) : replaceWith;
  }) : console.error(`template requires a string as the first argument`) || tempStr;
};

exports.buildPath = buildPath;
exports.camelCase = camelCase;
exports.camelCasePath = camelCasePath;
exports.capitalize = capitalize;
exports.cleanStr = cleanStr;
exports.containsStr = containsStr;
exports.delimitString = delimitString;
exports.eitherStr = eitherStr;
exports.hashString = hashString;
exports.hyphenator = hyphenator;
exports.isEmail = isEmail;
exports.isLowerCase = isLowerCase;
exports.isPhone = isPhone;
exports.isUpperCase = isUpperCase;
exports.isUrl = isUrl;
exports.isUuid = isUuid;
exports.mapString = mapString;
exports.parseJSON = parseJSON;
exports.plural = plural;
exports.removeDot = removeDot;
exports.singular = singular;
exports.snakeCase = snakeCase;
exports.spaceJoin = spaceJoin;
exports.styleCase = styleCase;
exports.template = template;
exports.trainCase = trainCase;
exports.wordCaps = wordCaps;
//# sourceMappingURL=template-a93b81d1.js.map
