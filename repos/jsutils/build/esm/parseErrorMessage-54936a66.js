import { v as validate } from './validate-0eec5ac6.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { h as hasOwn } from './hasOwn-deb5bbb8.js';
import { i as isStr } from './isStr-481ce69b.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import { i as isEmpty } from './isEmpty-324adee6.js';

const checkCall = (method, ...params) => isFunc(method) && method(...params) || undefined;

const complement = predicate => {
  const [valid] = validate({
    predicate
  }, {
    predicate: isFunc
  });
  return valid ? (...args) => !predicate(...args) : null;
};

const eitherFunc = (func1, func2) => isFunc(func1) && func1 || func2;

const debounce = (func, wait = 250, immediate = false) => {
  let timeout;
  function wrapFunc(...args) {
    if (!isFunc(func)) return null;
    const context = this;
    const later = () => {
      timeout = null;
      !immediate && func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) return isFunc(func) && func.apply(context, args);
  }
  return wrapFunc;
};

const doIt = (...args) => {
  const params = args.slice();
  const num = params.shift();
  const bindTo = params.shift();
  const cb = params.pop();
  if (!isNum(num) || !isFunc(cb)) return [];
  const doItAmount = new Array(num);
  const responses = [];
  for (let i = 0; i < doItAmount.length; i++) {
    const data = cb.call(bindTo, i, ...params);
    if (data === false) break;
    responses.push(data);
  }
  return responses;
};

const hasDomAccess = () => {
  try {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  } catch (error) {
    return false;
  }
};

const memorize = (func, getCacheKey, limit = 1) => {
  if (!isFunc(func) || getCacheKey && !isFunc(getCacheKey)) return console.error('Error: Expected a function', func, getCacheKey);
  let memorized = function () {
    const cache = memorized.cache;
    const key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
    if (hasOwn(cache, key)) return cache[key];
    const result = func.apply(this, arguments);
    isNum(limit) && Object.keys(cache).length < limit ? cache[key] = result : memorized.cache = {
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
  return !promise || !isFunc(promise.then) ? [new Error(`A promise or thenable is required as the first argument!`), null] : promise.then(data => [null, data]).catch(err => [err, undefined]);
};

const uuid = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);

const parseErrorMessage = exception => {
  return isStr(exception) && !isEmpty(exception) ? exception : isObj(exception) ? exception.message : null;
};

export { complement as a, doIt as b, checkCall as c, debounce as d, eitherFunc as e, throttleLast as f, hasDomAccess as h, limbo as l, memorize as m, parseErrorMessage as p, throttle as t, uuid as u };
//# sourceMappingURL=parseErrorMessage-54936a66.js.map
