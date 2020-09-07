import { useMemo } from 'react'
import { isArr } from '@keg-hub/jsutils'
import { noPropArr } from '../utils/helpers/noop'

/**
 * Returns a function that should be set as the element ref
 * <br/>Returned function updates the element to include a className
 * <br/>Class Name can from from the className prop, dataSet.class value and the defClass value 
 * @param {Array|string} classNames - Array of classes to add
 * @param {Array|string} classList - Array of default classes
 *
 * @returns {function} - Ref function to be added to the component
 */
export const useClassList = (classNames=noPropArr, classList=noPropArr) => {
  return useMemo(element => {
    const classArr = isArr(classList) ? classList : [ classList ]
    return isArr(classNames)
      ? classArr.concat(classNames)
      : classArr.concat([ classNames ])
  }, [...classNames, ...classList])
}