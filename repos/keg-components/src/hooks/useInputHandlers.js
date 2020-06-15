import { useMemo } from 'react'
import { get } from 'jsutils'
import { validateFunctions } from '../utils'

/**
 * @param {Function} handler - onChange handler
 * @param {Object} validFuncsMap - validation results for change handlers
 *
 * @returns {Object} the object to spread onto an Input element to provide its change handlers
 */
const makeHandlerObject = (
  handler,
  { onChange, onValueChange, onChangeText }
) => {
  return Boolean(onChange || onValueChange || onChangeText)
    ? { onChange: handler }
    : {}
}

/**
 * Returns an an object containing the event handler(s) for an Input component. This works
 * across web and native, and it will make sure that defined handlers are called in the right
 * contexts. Returned handlers are memoized where it is helpful.
 *
 * @param {Boolean} isWeb - true if platform is web, false if native
 * @param {Object} handlers - object holding handlers (e.g. component's props object)
 * @param {Function} handlers.onChange - cb of form (event) => ...
 * @param {Function} handlers.onChangeText - cb of form (value) => ...
 * @param {Function} handlers.onValueChange - cb of form (value) => ... (alias to onChangeText)
 *
 * @returns {Object} an object of change handler(s) to be spread to the input element.
 *
 * @example
 * const handlers = useInputHandlers(isWeb, { onChange, onValueChange })
 *
 * return <InputWrapperFoo { ...handlers } />
 */
export const useInputHandlers = (handlers = {}) => {
  const { onChange, onValueChange, onChangeText } = handlers

  return useMemo(() => {
    const areValidFuncs = validateFunctions(handlers)

    // create the onChange handler
    const handleChange = event => {
      const value = get(event, 'target.value')
      areValidFuncs.onChange && onChange(event)
      areValidFuncs.onValueChange && onValueChange(value)
      areValidFuncs.onChangeText && onChangeText(value)
    }

    return makeHandlerObject(handleChange, areValidFuncs)
  }, [ onChange, onValueChange, onChangeText ])
}
