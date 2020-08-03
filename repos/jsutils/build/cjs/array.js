'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isArr = require('./isArr-39234014.js');
var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');
var method = require('./index-7ab17e5a.js');
require('./hasOwn-7999ca65.js');
require('./string.js');
require('./isStr-8a57710e.js');
require('./toStr-8e499966.js');
require('./sanitize-0a18302d.js');
require('./isColl-5757310a.js');
require('./get-bfcf4646.js');
require('./isBool-aa6af74e.js');
require('./toBool-cfb8a7ec.js');
require('./softFalsy-3d7ead1c.js');
require('./isNum-c7164b50.js');
var number = require('./number.js');
require('./toNum-990ff777.js');
require('./cloneFunc-30c0acdd.js');
require('./typeOf-51fe5771.js');

const cloneArr = arr => Array.from([
...(isArr.isArr(arr) && arr || isObj.isObj(arr) && Object.entries(arr) || [])]);

const eitherArr = (a, b) => isArr.isArr(a) ? a : b;

const flatMap = (arr, mapFn) => {
  const [inputIsValid] = method.validate({
    arr,
    mapFn
  }, {
    arr: isArr.isArr,
    mapFn: isFunc.isFunc
  });
  if (!inputIsValid) return arr;
  return arr.reduce((finalArr, current) => {
    const result = mapFn(current);
    isArr.isArr(result) ? result.map(el => finalArr.push(el)) : finalArr.push(result);
    return finalArr;
  }, []);
};

const findExtrema = (arr, comparator) => {
  const [valid] = method.validate({
    arr,
    comparator
  }, {
    arr: isArr.isArr,
    $default: isFunc.isFunc
  });
  if (!valid) return null;
  return arr.length ? arr.reduce((extremaSoFar, next) => comparator(extremaSoFar, next) > 0 ? extremaSoFar : next) : null;
};

const findMax = (arr = [], propSelector = method.identity) => findExtrema(arr, (x, y) => method.compareTo(propSelector(x), propSelector(y)));

const findMin = (arr = [], propSelector = method.identity) => findExtrema(arr, (x, y) => method.compareTo(propSelector(y), propSelector(x)));

const omitRange = (arr, startIndex, count) => {
  const [inputIsValid] = method.validate({
    arr,
    startIndex,
    count
  }, {
    arr: isArr.isArr,
    $default: number.isNonNegative
  });
  if (!inputIsValid) return arr;
  const nextArr = [...arr];
  nextArr.splice(startIndex, count);
  return nextArr;
};

const randomArr = (arr, amount) => {
  if (!isArr.isArr(arr)) return arr;
  const useAmount = amount || 1;
  const randoms = [];
  for (let i = 0; i < useAmount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return !amount ? randoms[0] : randoms;
};

const randomizeArr = arr => !isArr.isArr(arr) && arr || arr.sort(() => 0.5 - Math.random());

const uniqArr = arr => !isArr.isArr(arr) && arr || arr.filter((e, i, arr) => arr.indexOf(e) == i);

exports.isArr = isArr.isArr;
exports.cloneArr = cloneArr;
exports.eitherArr = eitherArr;
exports.findExtrema = findExtrema;
exports.findMax = findMax;
exports.findMin = findMin;
exports.flatMap = flatMap;
exports.omitRange = omitRange;
exports.randomArr = randomArr;
exports.randomizeArr = randomizeArr;
exports.uniqArr = uniqArr;
