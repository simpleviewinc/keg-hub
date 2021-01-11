'use strict';

var validate = require('./validate-500f268a.js');
var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');
var hasOwn = require('./hasOwn-7999ca65.js');
var isStr = require('./isStr-8a57710e.js');
var isNum = require('./isNum-c7164b50.js');
var isEmpty = require('./isEmpty-73a79cab.js');

const checkCall = (method, ...params) => isFunc.isFunc(method) && method(...params) || undefined;

const complement = predicate => {
  const [valid] = validate.validate({
    predicate
  }, {
    predicate: isFunc.isFunc
  });
  return valid ? (...args) => !predicate(...args) : null;
};

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

const hasDomAccess = () => {
  try {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  } catch (error) {
    return false;
  }
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

const parseErrorMessage = exception => {
  return isStr.isStr(exception) && !isEmpty.isEmpty(exception) ? exception : isObj.isObj(exception) ? exception.message : null;
};

exports.checkCall = checkCall;
exports.complement = complement;
exports.debounce = debounce;
exports.doIt = doIt;
exports.eitherFunc = eitherFunc;
exports.hasDomAccess = hasDomAccess;
exports.limbo = limbo;
exports.memorize = memorize;
exports.parseErrorMessage = parseErrorMessage;
exports.throttle = throttle;
exports.throttleLast = throttleLast;
exports.uuid = uuid;
//# sourceMappingURL=parseErrorMessage-c24ed52c.js.map
