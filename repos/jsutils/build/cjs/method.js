'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isArr = require('./isArr-39234014.js');
var isFunc = require('./isFunc-f93803cb.js');
var isNum = require('./isNum-c7164b50.js');
require('./isColl-5757310a.js');
require('./get-711365f4.js');
var cloneFunc = require('./cloneFunc-6f1b4c75.js');
var typeOf = require('./typeOf-51fe5771.js');
var hasOwn = require('./hasOwn-7999ca65.js');

const checkCall = (method, ...params) => isFunc.isFunc(method) && method(...params) || undefined;

const eitherFunc = (func1, func2) => isFunc.isFunc(func1) && func1 || func2;

const debounce = (func, wait = 250, immediate = false) => {
  let timeout;
  function wrapFunc(...args) {
    if (!isFunc.isFunc(func)) return null;
    const context = this;
    const later = () => {
      timeout = null;
      !immediate && func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) return isFunc.isFunc(func) && func.apply(context, args);
  }
  return wrapFunc;
};

const doIt = (...args) => {
  const params = args.slice();
  const num = params.shift();
  const bindTo = params.shift();
  const cb = params.pop();
  if (!isNum.isNum(num) || !isFunc.isFunc(cb)) return [];
  const doItAmount = new Array(num);
  const responses = [];
  for (let i = 0; i < doItAmount.length; i++) {
    const data = cb.call(bindTo, i, ...params);
    if (data === false) break;
    responses.push(data);
  }
  return responses;
};

const memorize = (func, getCacheKey, limit = 1) => {
  if (!isFunc.isFunc(func) || getCacheKey && !isFunc.isFunc(getCacheKey)) return console.error('Error: Expected a function', func, getCacheKey);
  let memorized = function () {
    const cache = memorized.cache;
    const key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
    if (hasOwn.hasOwn(cache, key)) return cache[key];
    const result = func.apply(this, arguments);
    isNum.isNum(limit) && Object.keys(cache).length < limit ? cache[key] = result : memorized.cache = {
      [key]: result
    };
    return result;
  };
  memorized.cache = {};
  memorized.destroy = () => {
    getCacheKey = undefined;
    memorized.cache = undefined;
    memorized.destroy = undefined;
    memorized = undefined;
  };
  return memorized;
};

const throttle = (func, wait = 100) => {
  let waiting = false;
  return function (...args) {
    if (waiting) return;
    waiting = true;
    func.apply(this, args);
    return setTimeout(() => {
      waiting = false;
    }, wait);
  };
};

const throttleLast = (func, cb, wait = 100) => {
  let throttleTimeout;
  return function (...args) {
    if (throttleTimeout) clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(throttleTimeout);
    }, wait);
    typeof cb === 'function' && cb();
  };
};

const limbo = promise => {
  return !promise || !isFunc.isFunc(promise.then) ? [new Error(`A promise or thenable is required as the first argument!`), null] : promise.then(data => [null, data]).catch(err => [err, undefined]);
};

const uuid = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);

const match = (matchArg, ...args) => {
  if (!args.length) return null;
  for (let entry of args) {
    if (!isArr.isArr(entry)) {
      console.error(`Matching case must be an entry (a 2-element array). Found: ${typeOf.typeOf(entry)}`, entry);
      break;
    }
    const [caseValueOrPredicate, valueOnMatch] = entry;
    if (isFunc.isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg)) return valueOnMatch;
    if (caseValueOrPredicate === matchArg) return valueOnMatch;
  }
  return null;
};
match.default = () => true;

exports.isFunc = isFunc.isFunc;
exports.cloneFunc = cloneFunc.cloneFunc;
exports.applyToFunc = hasOwn.applyToFunc;
exports.pipeline = hasOwn.pipeline;
exports.checkCall = checkCall;
exports.debounce = debounce;
exports.doIt = doIt;
exports.eitherFunc = eitherFunc;
exports.limbo = limbo;
exports.match = match;
exports.memorize = memorize;
exports.throttle = throttle;
exports.throttleLast = throttleLast;
exports.uuid = uuid;
