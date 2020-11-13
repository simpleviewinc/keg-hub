'use strict';

var validate = require('./validate-500f268a.js');
var isArr = require('./isArr-39234014.js');
var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');
var isNonNegative = require('./isNonNegative-9959647c.js');
var noOp = require('./noOp-f7366b81.js');

const buildElementCountMap = arr => {
  const counts = new Map();
  for (let i = 0; i < arr.length; i++) {
    var _counts$get;
    const element = arr[i];
    const count = (_counts$get = counts.get(element)) !== null && _counts$get !== void 0 ? _counts$get : 0;
    counts.set(element, count + 1);
  }
  return counts;
};
const areCountMapsEqual = (mapA, mapB) => {
  if (mapA.size !== mapB.size) return false;
  for (let [key, count] of mapA) {
    const otherCount = mapB.get(key);
    if (otherCount !== count) return false;
  }
  return true;
};
const areFrequencyEqual = (arr, otherArr) => {
  const [valid] = validate.validate({
    arr,
    otherArr
  }, {
    $default: isArr.isArr
  });
  if (!valid) return null;
  if (arr === otherArr) return true;
  if (arr.length !== otherArr.length) return false;
  const arrCounts = buildElementCountMap(arr);
  const otherCounts = buildElementCountMap(otherArr);
  return areCountMapsEqual(arrCounts, otherCounts);
};

const areSetEqual = (arr, otherArr) => {
  const [valid] = validate.validate({
    arr,
    otherArr
  }, {
    $default: isArr.isArr
  });
  if (!valid) return null;
  if (arr === otherArr) return true;
  const [longest, shortest] = arr.length > otherArr.length ? [arr, otherArr] : [otherArr, arr];
  const arrSet = new Set(shortest);
  for (let i = 0; i < longest.length; i++) {
    const element = longest[i];
    if (!arrSet.has(element)) return false;
  }
  return true;
};

const cloneArr = arr => Array.from([
...(isArr.isArr(arr) && arr || isObj.isObj(arr) && Object.entries(arr) || [])]);

const eitherArr = (a, b) => isArr.isArr(a) ? a : b;

const flatMap = (arr, mapFn) => {
  const [inputIsValid] = validate.validate({
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
  const [valid] = validate.validate({
    arr,
    comparator
  }, {
    arr: isArr.isArr,
    $default: isFunc.isFunc
  });
  if (!valid) return null;
  return arr.length ? arr.reduce((extremaSoFar, next) => comparator(extremaSoFar, next) > 0 ? extremaSoFar : next) : null;
};

const findMax = (arr = [], propSelector = noOp.identity) => findExtrema(arr, (x, y) => noOp.compareTo(propSelector(x), propSelector(y)));

const findMin = (arr = [], propSelector = noOp.identity) => findExtrema(arr, (x, y) => noOp.compareTo(propSelector(y), propSelector(x)));

const omitRange = (arr, startIndex, count) => {
  const [inputIsValid] = validate.validate({
    arr,
    startIndex,
    count
  }, {
    arr: isArr.isArr,
    $default: isNonNegative.isNonNegative
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

const uniqArrByReference = arr => {
  return !isArr.isArr(arr) ? arr : arr.filter((e, i, arr) => arr.indexOf(e) == i);
};
const uniqArr = (arr, selector) => {
  if (!selector) return uniqArrByReference(arr);
  const {
    unique
  } = arr.reduce((data, element) => {
    const id = selector(element);
    !data.set.has(id) && data.unique.push(element);
    data.set.add(id);
    return data;
  }, {
    unique: [],
    set: new Set()
  });
  return unique;
};

exports.areCountMapsEqual = areCountMapsEqual;
exports.areFrequencyEqual = areFrequencyEqual;
exports.areSetEqual = areSetEqual;
exports.buildElementCountMap = buildElementCountMap;
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
exports.uniqArrByReference = uniqArrByReference;
//# sourceMappingURL=uniqArr-61937c4c.js.map
