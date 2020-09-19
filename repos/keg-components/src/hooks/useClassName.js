import { useCallback, useRef } from 'react'
import { getPlatform } from 'KegGetPlatform'
import { checkCall, eitherArr, isObj } from '@keg-hub/jsutils'
import { ensureClassArray } from '../utils/helpers/ensureClassArray'

const isWeb = getPlatform() === 'web'

/**
 * Returns a function that should be set as the element ref
 * <br/>Returned function updates the element to include a className
 * <br/>Class Name can from from the className prop, and the defClass value
 * @param {Array[string]} defClass - Default class to add to the component
 * @param {string|Array[string]} className - Class or an array of classes to add to the element
 * @param {Object|function} ref - Ref object passed to the consuming component
 *
 * @example
 * const classRef = useClassName('class-1', `class-2`, ref || React.createRef())
 * // The class attribute of the div will be `class-1 class-2`
 * return (<div ref={classRef} />My Div</div>)
 *
 * @returns {function} - Ref function to be added to the component
 */
export const useClassName = (defClass, className, ref) => {
  className = eitherArr(className, [className])
  const classRef = useRef(className)

  return useCallback(
    element => {
      if (isWeb && element) {
        // Add the default classes to the classList
        defClass && element.classList.add(defClass)

        // Ensure we have a flat array
        const classArr = ensureClassArray(className)

        // Loop over the previous classes, and see if any have been removed
        classRef.current.map(
          cls =>
            cls && classArr.indexOf(cls) === -1 && element.classList.remove(cls)
        )

        // Update our ref with the new classes
        // Which will allows us to check them for updates on next render
        classRef.current = classArr

        // Add the classes to the element
        element.classList.add(...classArr)
      }

      // Update the ref based on it's type
      isObj(ref) && 'current' in ref
        ? (ref.current = element)
        : checkCall(ref, element)
    },
    [ defClass, className.join(' '), ref ]
  )
}
