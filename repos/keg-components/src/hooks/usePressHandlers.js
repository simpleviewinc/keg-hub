import { useMemo } from 'react'
import { validateFunctions } from '../utils'

/**
 * @param {Boolean} isWeb - true if platform is web
 * @param {Function} handler - click/press handler
 * @param {Object} validFuncsMap - validation results for click/press handlers
 *
 * @returns {Object} the object to spread onto an pressable element to provide its change handlers
 */
const makeHandlerObject = (isWeb, handler, { onPress, onClick }) => {
  const handlerName = isWeb ? 'onClick' : 'onPress'
  return Boolean(onPress || onClick) ? { [handlerName]: handler } : {}
}

/**
 * Returns an an object containing the event handler(s) for a component that can be pressed/clicked.
 * This works across web and native, and it will make sure that defined handlers are called in the right
 * contexts. Returned handlers are memoized where it is helpful.
 *
 * @param {Boolean} isWeb - true if platform is web, false if native
 * @param {Object} handlers - object holding handlers (e.g. component's props object)
 * @param {Function} handlers.onPress - cb of form (event) => ...
 * @param {Function} handlers.onClick - cb of form (value) => ...
 *
 * @returns {Object} an object of change handler(s) to be spread to the pressable element.
 *
 * @example
 * const handlers = usePressHandlers(isWeb, { onClick, onPress })
 *
 * return <PressableComponent { ...handlers } />
 */
export const usePressHandlers = (isWeb, handlers = {}) => {
  const { onPress, onClick } = handlers

  return useMemo(() => {
    const validFuncsMap = validateFunctions(handlers)

    const handler = event => {
      validFuncsMap.onPress && onPress(event)
      validFuncsMap.onClick && onClick(event)
    }

    return makeHandlerObject(isWeb, handler, validFuncsMap)
  }, [ onPress, onClick ])
}
