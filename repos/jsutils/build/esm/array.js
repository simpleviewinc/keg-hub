import { i as isArr } from './isArr-a4420764.js';
export { i as isArr } from './isArr-a4420764.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { v as validate, c as compareTo, i as identity } from './index-937c3d49.js';
import './hasOwn-deb5bbb8.js';
import './string.js';
import './isStr-481ce69b.js';
import './toStr-0e5fe94c.js';
import './sanitize-2f5be6f2.js';
import './isColl-15a1452b.js';
import './get-8e62f069.js';
import './isBool-4d844d9e.js';
import './toBool-8f49e620.js';
import './softFalsy-b9d5bbac.js';
import './isNum-cc6ad9ca.js';
import { isNonNegative } from './number.js';
import './toNum-db57d125.js';
import './cloneFunc-8a9b7642.js';
import './typeOf-8c86a991.js';

const cloneArr = arr => Array.from([
...(isArr(arr) && arr || isObj(arr) && Object.entries(arr) || [])]);

const eitherArr = (a, b) => isArr(a) ? a : b;

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

const uniqArr = arr => !isArr(arr) && arr || arr.filter((e, i, arr) => arr.indexOf(e) == i);

export { cloneArr, eitherArr, findExtrema, findMax, findMin, flatMap, omitRange, randomArr, randomizeArr, uniqArr };
