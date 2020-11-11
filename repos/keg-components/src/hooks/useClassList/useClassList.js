import { useMemo } from 'react'
import { eitherArr, noPropArr } from '@keg-hub/jsutils'
import { ensureClassArray } from '../../utils/helpers/ensureClassArray'

/**
 * Builds an array of classNames, memoizes then returns them
 * <br/>Returned function updates the element to include a className
 * <br/>Class Name can from from the className prop, and the defClass value
 * @param {Array|string} className - Array of classes to add
 * @param {Array} classList - Array of default classes
 * @example
 * const arrayOfClassNames = useClassList(`class-1`, [ `class-2`, `class-3` ])
 * arrayOfClassNames === [ `class-2`, `class-3`, `class-1` ]
 *
 * @returns {function} - Ref function to be added to the component
 */
export const useClassList = (className, classList = noPropArr) => {
  const classListArr = eitherArr(classList, [classList])
  return useMemo(() => {
    return ensureClassArray(classListArr).concat([className])
  }, [ className, classListArr.join(' ') ])
}
