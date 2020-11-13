'use strict';

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

exports.validate = validate;
//# sourceMappingURL=validate-500f268a.js.map
