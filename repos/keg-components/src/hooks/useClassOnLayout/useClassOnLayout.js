import { useCallback } from 'react'
import {checkCall, eitherArr, noPropArr, noOp} from '@keg-hub/jsutils'

/**
 * Returns a function that should be set as the element's onLayout method
 * <br/>Ensures the classes are added to the dom element every time the onLayout method is called
 * @param {string|Array[string]} classList - Class or an array of classes to add to the element
 * @param {Object|function} onLayout - Custom onLayout method passed in from props
 *
 * @returns {function} - onLayout function to be applied to the element
 */
export const useClassOnLayout = (classList=noPropArr, onLayout=noOp) => {
  const classArr = eitherArr(classList, [classList])

  return useCallback(event => {
    const element = event?.nativeEvent?.target
    element?.classList?.add(...classArr)

    return checkCall(onLayout, event)
  }, [classArr.join(' '), onLayout])
}