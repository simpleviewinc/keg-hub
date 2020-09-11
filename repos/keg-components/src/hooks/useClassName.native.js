import { useCallback } from 'react'
import { checkCall, isObj } from '@keg-hub/jsutils'

/**
 * Placeholder hook for Native platforms
 * <br/>Just returns the passed in ref
 * 
 * @returns {Object|function|undefeind} - Passed in Ref
 */
export const useClassName = (defClass, className, ref) => {
  return ref
}
