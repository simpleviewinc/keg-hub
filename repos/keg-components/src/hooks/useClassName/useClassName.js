import { useCallback, useRef } from 'react'
import { getPlatform } from 'KegGetPlatform'
import { eitherArr } from '@keg-hub/jsutils'
import { updateClassNames } from '../../utils/helpers/updateClassNames'
import { handleRefUpdate } from '../../utils/helpers/handleRefUpdate'

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
  const classArr = eitherArr(className, [className])
  const classRef = useRef(classArr)

  return useCallback(
    element => {
      isWeb &&
        element &&
        updateClassNames(element, classRef, defClass, classArr)

      handleRefUpdate(ref, element)
    },
    [ defClass, classArr.join(' '), ref ]
  )
}
