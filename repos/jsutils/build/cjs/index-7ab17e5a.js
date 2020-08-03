'use strict';

var isArr = require('./isArr-39234014.js');
var isFunc = require('./isFunc-f93803cb.js');
var hasOwn = require('./hasOwn-7999ca65.js');
require('./string.js');
var isStr = require('./isStr-8a57710e.js');
var isBool = require('./isBool-aa6af74e.js');
require('./toBool-cfb8a7ec.js');
require('./softFalsy-3d7ead1c.js');
var isNum = require('./isNum-c7164b50.js');
require('./number.js');
var cloneFunc = require('./cloneFunc-30c0acdd.js');
var typeOf = require('./typeOf-51fe5771.js');

const OPTIONS = {
  SHOULD_LOG: true,
  SHOULD_THROW: false,
  LOG_PREFIX: null
};
const validate = (argObj, validators = {}, {
  logs = OPTIONS.SHOULD_LOG,
  throws = OPTIONS.SHOULD_THROW,
  prefix = OPTIONS.LOG_PREFIX
} = {}) => {
  const validationCaseEntries = Object.entries(argObj);
  const defaultValidator = () => true;
  const validationResults = validationCaseEntries.map(([argName, argValue]) => validateArgument(argName, argValue, validators[argName] || validators['$default'] || defaultValidator));
  const reduceCases = (total, next) => validationReducer(total, next, {
    logs,
    throws,
    prefix
  });
  const {
    success,
    cases
  } = validationResults.reduce(reduceCases, {
    success: true,
    cases: {}
  });
  return [success, cases];
};
validate.setOptions = ({
  logs,
  throws,
  prefix
}) => {
  if (logs !== undefined) {
    OPTIONS.SHOULD_LOG = logs;
  }
  if (throws !== undefined) {
    OPTIONS.SHOULD_THROW = throws;
  }
  if (prefix !== undefined) {
    OPTIONS.LOG_PREFIX = prefix;
  }
};
validate.resetOptions = () => {
  OPTIONS.SHOULD_LOG = true;
  OPTIONS.SHOULD_THROW = false;
  OPTIONS.LOG_PREFIX = null;
};
const validateArgument = (key, value, validator) => {
  const success = validator(value);
  const shouldStringifyValidator = !validator.name || validator.name === key || validator.name === '$default';
  const validatorString = shouldStringifyValidator ? validator.toString() : validator.name;
  const reason = success ? null : [`Argument "${key}" with value `, value, ` failed validator: ${validatorString}.`];
  return {
    success,
    key,
    value,
    validator,
    reason
  };
};
const validationReducer = (finalResult, nextValidation, {
  logs,
  throws,
  prefix
}) => {
  !nextValidation.success && handleFailure(nextValidation, logs, throws, prefix);
  return {
    success: finalResult.success && nextValidation.success,
    cases: { ...finalResult.cases,
      [nextValidation.key]: nextValidation
    }
  };
};
const handleFailure = (validation, shouldLog, shouldThrow, prefix) => {
  const reason = prefix ? [prefix, ...validation.reason] : validation.reason;
  if (shouldThrow) throw new Error(reason.join());
  if (shouldLog) console.error(...reason);
};

const checkCall = (method, ...params) => isFunc.isFunc(method) && method(...params) || undefined;

const complement = predicate => {
  const [valid] = validate({
    predicate
  }, {
    predicate: isFunc.isFunc
  });
  return valid ? (...args) => !predicate(...args) : null;
};

const isOrderable = x => isStr.isStr(x) || isNum.isNum(x) || isBool.isBool(x);

const compareTo = (x, y) => {
  const [valid] = validate({
    x,
    y
  }, {
    $default: isOrderable
  });
  if (!valid) return null;
  return isStr.isStr(x) ? x.localeCompare(y) : x - y;
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

const identity = x => x;

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
exports.applyToFunc = hasOwn.applyToFunc;
exports.pipeline = hasOwn.pipeline;
exports.cloneFunc = cloneFunc.cloneFunc;
exports.checkCall = checkCall;
exports.compareTo = compareTo;
exports.complement = complement;
exports.debounce = debounce;
exports.doIt = doIt;
exports.eitherFunc = eitherFunc;
exports.identity = identity;
exports.isOrderable = isOrderable;
exports.limbo = limbo;
exports.match = match;
exports.memorize = memorize;
exports.throttle = throttle;
exports.throttleLast = throttleLast;
exports.uuid = uuid;
exports.validate = validate;
