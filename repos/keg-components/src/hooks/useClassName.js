import { useCallback } from 'react'
import { checkCall, isObj, isArr } from '@keg-hub/jsutils'
import { getPlatform } from 'KegGetPlatform'
const isWeb = getPlatform() === 'web'

/**
 * Returns a function that should be set as the element ref
 * <br/>Returned function updates the element to include a className
 * <br/>Class Name can from from the className prop, and the defClass value
 * @param {Array[string]} defClass - Default class to add to the component
 * @param {string|Array[string]} className - Class or an array of classes to add to the element
 * @param {Object|function} ref - Ref object passed to the consuming component
 *
 * @returns {function} - Ref function to be added to the component
 */
export const useClassName = (defClass, className, ref) => {
  className = isArr(className) ? className : [className]

  return useCallback(
    element => {
      if (isWeb && element) {
        // Add the default classes to the classList
        defClass && element.classList.add(defClass)

        // Add className to the classList
        className.map(cls => cls && element.classList.add(cls))
      }

      // Update the ref based on it's type
      isObj(ref) && 'current' in ref
        ? (ref.current = element)
        : checkCall(ref, element)
    },
    [ defClass, ...className, ref ]
  )
}
