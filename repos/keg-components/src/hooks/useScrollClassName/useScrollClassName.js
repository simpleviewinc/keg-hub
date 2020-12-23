import { useRef, useCallback } from 'react'
import { getPlatform } from 'KegGetPlatform'
import { eitherArr, isFunc } from '@keg-hub/jsutils'
import { handleRefUpdate } from '../../utils/helpers/handleRefUpdate'
import { updateClassNames } from '../../utils/helpers/updateClassNames'

const isWeb = getPlatform() === 'web'

/**
 * Custom hook to update the ScrollView with passed in classNames
 * <br/>Uses getScrollableNode and getInnerViewNode to get access to the Dom Nodes
 * @param {Array[string]} defClass - Default class to add to the component
 * @param {string|Array[string]} className - Class or an array of classes to add to the element
 * @param {Object|function} ref - Ref object passed to the consuming component
 *
 * @returns {function} - Ref function to be added to the component
 */
export const useScrollClassName = (
  defClass,
  className,
  innerClassName,
  ref
) => {
  className = eitherArr(className, [className])
  const classRef = useRef(className)

  return useCallback(
    nativeObject => {
      const scrollResponder =
        nativeObject && isFunc(nativeObject.getScrollResponder)
          ? nativeObject.getScrollResponder()
          : nativeObject

      if (isWeb && scrollResponder) {
        isFunc(scrollResponder.getScrollableNode) &&
          updateClassNames(
            scrollResponder.getScrollableNode(),
            classRef,
            defClass,
            className
          )

        isFunc(scrollResponder.getInnerViewNode) &&
          updateClassNames(
            scrollResponder.getInnerViewNode(),
            classRef,
            `${defClass}-container`,
            innerClassName
          )
      }

      handleRefUpdate(ref, scrollResponder)
    },
    [ defClass, className.join(' '), ref ]
  )
}
