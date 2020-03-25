import { i as isArr } from './isArr-a4420764.js';
export { i } from './isArr-a4420764.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { i as isNonNegative } from './isNonNegative-76ec0014.js';

const cloneArr = arr => Array.from([
...(isArr(arr) && arr || isObj(arr) && Object.entries(arr) || [])]);

const eitherArr = (a, b) => isArr(a) ? a : b;

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

export { randomizeArr as a, cloneArr as c, eitherArr as e, flatMap as f, omitRange as o, randomArr as r, uniqArr as u, validate as v };
