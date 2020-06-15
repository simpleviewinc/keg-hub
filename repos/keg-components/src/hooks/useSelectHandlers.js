import { useMemo } from 'react'
import { get } from 'jsutils'
import { validateFunctions } from '../utils'

/**
 * @param {Function} handler - onChange handler
 * @param {Object} validFuncsMap - validation results for change handlers
 *
 * @returns {Object} the object to spread onto an Select element to provide its change handlers
 */
const makeHandlerObject = (handler, { onChange, onValueChange }) => {
  return Boolean(onChange || onValueChange) ? { onChange: handler } : {}
}

/**
 * Returns an an object containing the event handler(s) for a Select component. This works
 * across web and native, and it will make sure that defined handlers are called in the right
 * contexts. Returned handlers are memoized where it is helpful.
 *
 * @param {Boolean} isWeb - true if platform is web, false if native
 * @param {Object} handlers - object holding handlers (e.g. component's props object)
 * @param {Function} handlers.onChange - cb of form (event) => ...
 * @param {Function} handlers.onValueChange - cb of form (value) => ...
 *
 * @returns {Object} an object of change handler(s) to be spread to the Select element.
 *
 * @example
 * const handlers = useSelectHandlers(isWeb, { onChange, onValueChange })
 *
 * return <SelectWrapperFoo { ...handlers } />
 */
export const useSelectHandlers = (handlers = {}) => {
  const { onChange, onValueChange } = handlers

  return useMemo(() => {
    const validFuncMap = validateFunctions(handlers)

    // create an onChange handler for the web-based select component that calls onChange and onValueChange (for web) correctly
    const onChangeHandler = event => {
      const value = get(event, 'target.value')
      validFuncMap.onChange && onChange(event)
      validFuncMap.onValueChange && onValueChange(value)
    }

    return makeHandlerObject(onChangeHandler, validFuncMap)
  }, [ onChange, onValueChange ])
}
