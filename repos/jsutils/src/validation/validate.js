/** @module validation */

const OPTIONS = {
  SHOULD_LOG: true,
  SHOULD_THROW: false,
  LOG_PREFIX: null
}

// if no default or custom validator set for an arg, just assert it is valid
const defaultValidator = () => true

/** 
 *  Validates each key-value entry in argObj using the validator functions in validators with matching keys. 
 *  For any failures, validate will console.error the reason.
 *  @param { Object } argObj - object, where keys are the name of the argument to validate, and value is its value
 *  @param { Object } validators - object, where keys match the argument and values are predicate functions (return true/false and are passed the arg with the same key). 
 *     - Use the `$default` key to define a default validator, which will validate any argument that doesn't have a custom validator defined.
 *  @param { Object } options - contains `logs`, `throws`, and `prefix` props. When a validation fails, it will throw an error if `throws` is true. Else it logs error if `logs` is true. `prefix` prepends a string to the error messages.
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
export const validate = (argObj, validators={}, options={}) => {
  const { 
    logs=OPTIONS.SHOULD_LOG, 
    throws=OPTIONS.SHOULD_THROW, 
    prefix=OPTIONS.LOG_PREFIX,
  } = options

  const validationCaseEntries = Object.entries(argObj)

  // validate each argument
  const validationResults = validationCaseEntries.map(
    ([argName, argValue]) => validateArgument(
      argName,
      argValue,
      validators[argName] || validators.$default || defaultValidator
    )
  )

  // reduce the argument validation results into a single object of form { success, cases }.
  // success is true if all arguments passed their validators. Cases holds each argument's validation results.
  const reduceCases = (total, next) => validationReducer(total, next, { logs, throws, prefix })
  const { success, cases } = validationResults.reduce(reduceCases, { success: true, cases: {} })

  return [ success, cases ]
}

/**
 * If you need to configure validation properties globally, you can do so here. These are overridden by the validate options arguments,
 * if one is defined in validate().
 * @function
 * @param {Object} options 
 * @param {Boolean} options.logs - indicates you want validate() to log errors when a case fails
 * @param {Boolean} options.throws - indicates validate() should throw an error when a case fails
 * @param {String} options.prefix - a prefix to any console error logs or to messages of errors thrown
 */
validate.setOptions = ({ logs, throws, prefix }) => {
  if (logs !== undefined) {
    OPTIONS.SHOULD_LOG = logs
  }
  if (throws !== undefined) {
    OPTIONS.SHOULD_THROW = throws
  }
  if (prefix !== undefined) {
    OPTIONS.LOG_PREFIX = prefix
  }
}

/**
 * Resets the global validation options to their defaults
 * @function
 */
validate.resetOptions = () => {
  OPTIONS.SHOULD_LOG = true
  OPTIONS.SHOULD_THROW = false
  OPTIONS.LOG_PREFIX = null
}

/**
 * Helper for `validate`. Validates a single value given a validator
 * @param {*} key 
 * @param {*} value 
 * @param {Function} validator 
 * @returns {Object} of form { success, reason }
 * @ignore
 */
const validateArgument = (key, value, validator) => {
  const success = validator(value)

  // if validator is a named function, use its name. If it is an inline anonymous arrow function, its name
  // matches the argument key and it has no useful/descriptive name, so just stringify it
  const shouldStringifyValidator = !validator.name || (validator.name === key) || (validator.name === '$default')
  const validatorString = shouldStringifyValidator ? validator.toString() : validator.name

  const reason = success
    ? null
    : [
      `Argument "${key}" with value `, 
      value, 
      ` failed validator: ${validatorString}.`
    ] 
   
  return { success, key, value, validator, reason }
}

/**
 * Helper for `validate`. Reduces validations into a single object of form { success, cases }
 * @param {*} finalResult
 * @param {*} nextValidation
 * @ignore
 */
const validationReducer = (finalResult, nextValidation, { logs, throws, prefix }) => {
  // handle the failure
  !nextValidation.success && handleFailure(nextValidation, logs, throws, prefix)

  return {
    success: finalResult.success && nextValidation.success,
    cases: {
      ...finalResult.cases,
      [nextValidation.key]: nextValidation
    }
  }
}

/**
 * Handles a validation failure given validation options
 * @param {Object} validation 
 * @param {Boolean} shouldLog 
 * @param {Boolean} shouldThrow 
 * @param {String} prefix - optional prefix to any error or console log 
 * @ignore
 */
const handleFailure = (validation, shouldLog, shouldThrow, prefix) => {
  // prepend the prefix if one is defined
  const reason = prefix
    ? [ prefix, ...validation.reason ]
    : validation.reason

  if (shouldThrow)
    throw new Error(reason.join())
  
  if (shouldLog)
    console.error(...reason)
}
