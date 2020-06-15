import { mapEntries, isFunc, isObj } from 'jsutils'
/**
 * Validates each function in the functionObj
 * @param {Object} functionObj - object with functions as entries
 *
 * @returns {Object} an object with the same keys as functionObj, only mapped to the result of their validation
 *
 * @example
 * const foo = () => {}
 * const bar = 1
 * const result = validateFunctions({ foo, bar })
 * result.foo // true
 * result.bar // false
 */
export const validateFunctions = functionObj => {
  return (
    (isObj(functionObj) &&
      mapEntries(functionObj, (name, func) => [ name, isFunc(func) ])) ||
    {}
  )
}
