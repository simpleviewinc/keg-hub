import { useMemo } from 'react'
import { isArr } from '@keg-hub/jsutils'
import { noPropArr } from '../utils/helpers/noop'

/**
 * Builds an array of classNames, memoizes then returns them
 * <br/>Returned function updates the element to include a className
 * <br/>Class Name can from from the className prop, and the defClass value
 * @param {Array|string} className - Array of classes to add
 * @param {Array} classList - Array of default classes
 *
 * @returns {function} - Ref function to be added to the component
 */
export const useClassList = (className, classList = noPropArr) => {
  const classListArr = isArr(classList) ? classList : [classList]
  return useMemo(() => {
    return classListArr.concat([className])
  }, [ className, ...classListArr ])
}
