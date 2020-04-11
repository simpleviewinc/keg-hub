import './isArr-a4420764.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { i as isStr } from './isStr-481ce69b.js';
export { i as isStr } from './isStr-481ce69b.js';
import { t as toStr$1 } from './toStr-0e5fe94c.js';
export { t as toStr } from './toStr-0e5fe94c.js';
import { i as isColl } from './isColl-15a1452b.js';
import { g as get } from './get-e0378510.js';
export { s as sanitize } from './sanitize-2f5be6f2.js';

const buildPath = (...args) => {
  const built = args.reduce((path, arg) => {
    let str = toStr(arg);
    return `${path}${str && '/' + str || ''}`;
  }, '');
  return built.replace(/([^:\/]|^)\/{2,}/g, '$1/');
};

const mapString = (str, charMapper) => {
  if (!isStr(str)) return str;
  if (!isFunc(charMapper)) return str;
  let result = "";
  for (const char of str) {
    result += charMapper(char);
  }
  return result;
};

const isLowerCase = str => str === str.toLowerCase();

const isUpperCase = str => str === str.toUpperCase();

const delimitString = (str, delimiter, delimiters = ['-', '_', ' ']) => {
  if (!isStr(str)) return str;
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

const capitalize = str => isStr(str) && str[0] && `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}` || str;

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

const containsStr = (str, substring, fromIndex) => {
  str = !isStr(str) && toStr$1(str) || str;
  substring = !isStr(substring) && toStr$1(substring) || substring;
  return str.indexOf(substring, fromIndex) !== -1;
};

const eitherStr = (str1, str2) => isStr(str1) && str1 || str2;

const isEmail = str => {
  if (!str || !isStr(str)) return false;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return Boolean(regex.test(str));
};

const isPhone = str => {
  if (!str || !isStr(str)) return false;
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11;
};

const isUrl = str => {
  const regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return Boolean(regex.test(str));
};

const isUuid = str => {
  if (!str || !isStr(str)) return false;
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
  if (!isStr(str)) return str;
  const cased = camelCase(str);
  return `${cased[0].toLowerCase()}${cased.slice(1)}`;
};

const trainCase = str => isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join('-').toLowerCase() || str;

const wordCaps = str => {
  if (!isStr(str)) return str;
  let cleaned = cleanStr(str);
  return cleaned.split(' ').map(word => word && capitalize(word) || '').join(' ');
};

const template = (tempStr, data, fallback = '') => {
  data = isColl(data) && data || {};
  const regex = template.regex || /\${([^{]+[^}])}/g;
  return isStr(tempStr) ? tempStr.replace(regex, (match, exact) => {
    const path = (exact || match.substr(2, match.length - 3)).trim();
    const replaceWith = get(data, path, fallback);
    return isFunc(replaceWith) ? replaceWith(data, path, fallback) : replaceWith;
  }) : console.error(`template requires a string as the first argument`) || tempStr;
};

export { buildPath, camelCase, capitalize, cleanStr, containsStr, delimitString, eitherStr, isEmail, isLowerCase, isPhone, isUpperCase, isUrl, isUuid, mapString, parseJSON, plural, removeDot, singular, snakeCase, styleCase, template, trainCase, wordCaps };
