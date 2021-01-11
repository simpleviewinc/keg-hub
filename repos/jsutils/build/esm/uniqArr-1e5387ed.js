import { v as validate } from './validate-0eec5ac6.js';
import { i as isArr } from './isArr-a4420764.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { b as noOpObj, a as identity, c as compareTo } from './match-312736a1.js';
import { e as exists } from './exists-bf542cb8.js';
import { i as isNonNegative } from './isNonNegative-76ec0014.js';

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
  const [valid] = validate({
    arr,
    otherArr
  }, {
    $default: isArr
  });
  if (!valid) return null;
  if (arr === otherArr) return true;
  if (arr.length !== otherArr.length) return false;
  const arrCounts = buildElementCountMap(arr);
  const otherCounts = buildElementCountMap(otherArr);
  return areCountMapsEqual(arrCounts, otherCounts);
};

const areSetEqual = (arr, otherArr) => {
  const [valid] = validate({
    arr,
    otherArr
  }, {
    $default: isArr
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
...(isArr(arr) && arr || isObj(arr) && Object.entries(arr) || [])]);

const eitherArr = (a, b) => isArr(a) ? a : b;

const ensureArr = val => isArr(val) ? val : [val];

const flatten = (arr, result, opts) => {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    isArr(value) ? flatten(value, result, opts) : opts.exists && !exists(value) || opts.truthy && !value ? result : result.push(value);
  }
  if (!opts.mutate) return result;
  Object.assign(arr, result).splice(result.length);
  return arr;
};
const flatArr = (arr, opts) => flatten(arr, [], isObj(opts) ? opts : noOpObj);

const flatMap = (arr, mapFn) => {
  const [inputIsValid] = validate({
    arr,
    mapFn
  }, {
    arr: isArr,
    mapFn: isFunc
  });
  if (!inputIsValid) return arr;
  return arr.reduce((finalArr, current) => {
    const result = mapFn(current);
    isArr(result) ? result.map(el => finalArr.push(el)) : finalArr.push(result);
    return finalArr;
  }, []);
};

const findExtrema = (arr, comparator) => {
  const [valid] = validate({
    arr,
    comparator
  }, {
    arr: isArr,
    $default: isFunc
  });
  if (!valid) return null;
  return arr.length ? arr.reduce((extremaSoFar, next) => comparator(extremaSoFar, next) > 0 ? extremaSoFar : next) : null;
};

const findMax = (arr = [], propSelector = identity) => findExtrema(arr, (x, y) => compareTo(propSelector(x), propSelector(y)));

const findMin = (arr = [], propSelector = identity) => findExtrema(arr, (x, y) => compareTo(propSelector(y), propSelector(x)));

const omitRange = (arr, startIndex, count) => {
  const [inputIsValid] = validate({
    arr,
    startIndex,
    count
  }, {
    arr: isArr,
    $default: isNonNegative
  });
  if (!inputIsValid) return arr;
  const nextArr = [...arr];
  nextArr.splice(startIndex, count);
  return nextArr;
};

const randomArr = (arr, amount) => {
  if (!isArr(arr)) return arr;
  const useAmount = amount || 1;
  const randoms = [];
  for (let i = 0; i < useAmount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return !amount ? randoms[0] : randoms;
};

const randomizeArr = arr => !isArr(arr) && arr || arr.sort(() => 0.5 - Math.random());

const uniqArrByReference = arr => {
  return !isArr(arr) ? arr : arr.filter((e, i, arr) => arr.indexOf(e) == i);
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

export { areCountMapsEqual as a, buildElementCountMap as b, areFrequencyEqual as c, areSetEqual as d, cloneArr as e, eitherArr as f, ensureArr as g, flatArr as h, flatMap as i, findExtrema as j, findMax as k, findMin as l, randomizeArr as m, uniqArr as n, omitRange as o, randomArr as r, uniqArrByReference as u };
//# sourceMappingURL=uniqArr-1e5387ed.js.map
