"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/** @module validation */
var OPTIONS = {
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

var validate = function validate(argObj) {
  var validators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$logs = _ref.logs,
      logs = _ref$logs === void 0 ? OPTIONS.SHOULD_LOG : _ref$logs,
      _ref$throws = _ref["throws"],
      _throws = _ref$throws === void 0 ? OPTIONS.SHOULD_THROW : _ref$throws,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? OPTIONS.LOG_PREFIX : _ref$prefix;

  var validationCaseEntries = Object.entries(argObj); // if no default or custom validator set for an arg, just assert it is valid

  var defaultValidator = function defaultValidator() {
    return true;
  }; // validate each argument


  var validationResults = validationCaseEntries.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        argName = _ref3[0],
        argValue = _ref3[1];

    return validateArgument(argName, argValue, validators[argName] || validators['$default'] || defaultValidator);
  }); // reduce the argument validation results into a single object of form { success, cases }.
  // success is true if all arguments passed their validators. Cases holds each argument's validation results.

  var reduceCases = function reduceCases(total, next) {
    return validationReducer(total, next, {
      logs: logs,
      "throws": _throws,
      prefix: prefix
    });
  };

  var _validationResults$re = validationResults.reduce(reduceCases, {
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

validate.setOptions = function (_ref4) {
  var logs = _ref4.logs,
      _throws2 = _ref4["throws"],
      prefix = _ref4.prefix;

  if (logs !== undefined) {
    OPTIONS.SHOULD_LOG = logs;
  }

  if (_throws2 !== undefined) {
    OPTIONS.SHOULD_THROW = _throws2;
  }

  if (prefix !== undefined) {
    OPTIONS.LOG_PREFIX = prefix;
  }
};
/**
 * Resets the global validation options to their defaults
 * @function
 */


validate.resetOptions = function () {
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


var validateArgument = function validateArgument(key, value, validator) {
  var success = validator(value); // if validator is a named function, use its name. If it is an inline anonymous arrow function, its name
  // matches the argument key and it has no useful/descriptive name, so just stringify it

  var shouldStringifyValidator = !validator.name || validator.name === key || validator.name === '$default';
  var validatorString = shouldStringifyValidator ? validator.toString() : validator.name;
  var reason = success ? null : ["Argument \"".concat(key, "\" with value "), value, " failed validator: ".concat(validatorString, ".")];
  return {
    success: success,
    key: key,
    value: value,
    validator: validator,
    reason: reason
  };
};
/**
 * Helper for `validate`. Reduces validations into a single object of form { success, cases }
 * @param {*} finalResult 
 * @param {*} nextValidation 
 */


var validationReducer = function validationReducer(finalResult, nextValidation, _ref5) {
  var logs = _ref5.logs,
      _throws3 = _ref5["throws"],
      prefix = _ref5.prefix;
  // handle the failure
  !nextValidation.success && handleFailure(nextValidation, logs, _throws3, prefix);
  return {
    success: finalResult.success && nextValidation.success,
    cases: _objectSpread({}, finalResult.cases, _defineProperty({}, nextValidation.key, nextValidation))
  };
};
/**
 * Handles a validation failure given validation options
 * @param {Object} validation 
 * @param {Boolean} shouldLog 
 * @param {Boolean} shouldThrow 
 * @param {String} prefix - optional prefix to any error or console log 
 */


var handleFailure = function handleFailure(validation, shouldLog, shouldThrow, prefix) {
  var _console;

  // prepend the prefix if one is defined
  var reason = prefix ? [prefix].concat(_toConsumableArray(validation.reason)) : validation.reason;
  if (shouldThrow) throw new Error(reason.join());
  if (shouldLog) (_console = console).error.apply(_console, _toConsumableArray(reason));
};