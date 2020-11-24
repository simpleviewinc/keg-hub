import { useCallback } from 'react'
import {checkCall, noOp} from '@keg-hub/jsutils'

/**
 * Placeholder hook for Native platforms
 * <br/>Checks if the onLayout argument is a function and calls it
 * @param {*} __ - Not used on native platforms
 * @param {Object|function} onLayout - Custom onLayout method passed in from props
 *
 * @returns {function} - onLayout function to be applied to the element
 */
export const useClassOnLayout = (__, onLayout=noOp) => useCallback(event => {
  return checkCall(onLayout, event)
}, [onLayout])