"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @module validation */
const OPTIONS = {
  SHOULD_LOG: true,
  SHOULD_THROW: false,
  LOG_PREFIX: null
};
/** 
 *  Validates each key-value entry in argObj using the validator functions in validators with matching keys. 
 *  For any failures, validate will console.error the reason.
 *  @param { Object } argObj - object, where keys are the name of the argument to validate, and value is its value
 *  @param { Object } validators - object, where keys match the argument and values are predicate functions (return true/false and are passed the arg with the same key). 
 *     - Use the `$default` key to define a default validator, which will validate any argument that doesn't have a custom validator defined.
 *  @param { Object } options - contains `logs` and `throws` props. When a validation fails, it will throw an error if `throws` is true. Else it logs error if `logs` is true.
 *  @returns { Array } - an entry with two values [ success, results ]. 
 *     - success: { Boolean } that is true if all arguments passed their validators, false otherwise
 *     - results: { Object } that holds the validation results for each argument, keyed by the same keys as in argObj. For each
 *                result object, the properties are: { success, key, value, validator, reason }.
 *  @function
 *  @example 
 *    const elements = {}
 *    const name = 'michael'
 *    const address = '12345 E. Street'
 *    const [ isValid, results ] = validate(
 *      { elements, name, address },
 *      { elements: isArr, $default: isStr }
 *    )
 *    console.log(isValid) // false
 *    console.log(results.elements.success) // false
 */

const validate = (argObj, validators = {}, {
  logs = OPTIONS.SHOULD_LOG,
  "throws": throws = OPTIONS.SHOULD_THROW,
  prefix = OPTIONS.LOG_PREFIX
} = {}) => {
  const validationCaseEntries = Object.entries(argObj); // if no default or custom validator set for an arg, just assert it is valid

  const defaultValidator = () => true; // validate each argument


  const validationResults = validationCaseEntries.map(([argName, argValue]) => validateArgument(argName, argValue, validators[argName] || validators['$default'] || defaultValidator)); // reduce the argument validation results into a single object of form { success, cases }.
  // success is true if all arguments passed their validators. Cases holds each argument's validation results.

  const reduceCases = (total, next) => validationReducer(total, next, {
    logs,
    "throws": throws,
    prefix
  });

  const _validationResults$re = validationResults.reduce(reduceCases, {
    success: true,
    cases: {}
  }),
        success = _validationResults$re.success,
        cases = _validationResults$re.cases;

  return [success, cases];
};
/**
 * If you need to configure validation properties globally, you can do so here. These are overridden by the validate options arguments,
 * if one is defined in validate().
 * @function
 * @param {Object} options 
 * @param {Boolean} options.logs - indicates you want validate() to log errors when a case fails
 * @param {Boolean} options.throws - indicates validate() should throw an error when a case fails
 * @param {String} options.prefix - a prefix to any console error logs or to messages of errors thrown
 */


exports.validate = validate;

validate.setOptions = ({
  logs,
  "throws": throws,
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
/**
 * Resets the global validation options to their defaults
 * @function
 */


validate.resetOptions = () => {
  OPTIONS.SHOULD_LOG = true;
  OPTIONS.SHOULD_THROW = false;
  OPTIONS.LOG_PREFIX = null;
};
/**
 * Helper for `validate`. Validates a single value given a validator
 * @param {*} key 
 * @param {*} value 
 * @param {Function} validator 
 * @returns {Object} of form { success, reason }
 */


const validateArgument = (key, value, validator) => {
  const success = validator(value); // if validator is a named function, use its name. If it is an inline anonymous arrow function, its name
  // matches the argument key and it has no useful/descriptive name, so just stringify it

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
/**
 * Helper for `validate`. Reduces validations into a single object of form { success, cases }
 * @param {*} finalResult 
 * @param {*} nextValidation 
 */


const validationReducer = (finalResult, nextValidation, {
  logs,
  "throws": throws,
  prefix
}) => {
  // handle the failure
  !nextValidation.success && handleFailure(nextValidation, logs, throws, prefix);
  return {
    success: finalResult.success && nextValidation.success,
    cases: _objectSpread({}, finalResult.cases, {
      [nextValidation.key]: nextValidation
    })
  };
};
/**
 * Handles a validation failure given validation options
 * @param {Object} validation 
 * @param {Boolean} shouldLog 
 * @param {Boolean} shouldThrow 
 * @param {String} prefix - optional prefix to any error or console log 
 */


const handleFailure = (validation, shouldLog, shouldThrow, prefix) => {
  // prepend the prefix if one is defined
  const reason = prefix ? [prefix, ...validation.reason] : validation.reason;
  if (shouldThrow) throw new Error(reason.join());
  if (shouldLog) console.error(...reason);
};