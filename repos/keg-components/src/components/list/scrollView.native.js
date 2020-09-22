import React, { useCallback, useRef } from 'react'
import { ScrollView as RNScrollView } from 'react-native'
import { getPlatform } from 'KegGetPlatform'
import { eitherArr } from '@keg-hub/jsutils'
import { updateClassNames } from '../../utils/helpers/updateClassNames'
import { handelRefUpdate } from '../../utils/helpers/handelRefUpdate'
import PropTypes from 'prop-types'

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
const useScrollClassNames = (defClass, className, innerClassName, ref) => {
  className = eitherArr(className, [className])
  const classRef = useRef(className)

  return useCallback(
    scrollResponder => {
      if (isWeb && scrollResponder) {
        updateClassNames(
          scrollResponder.getScrollableNode(),
          classRef,
          defClass,
          className
        )
        updateClassNames(
          scrollResponder.getInnerViewNode(),
          classRef,
          `${defClass}-container`,
          innerClassName
        )
      }

      handelRefUpdate(ref, scrollResponder)
    },
    [ defClass, className.join(' '), ref ]
  )
}

/**
 * ScrollView
 * @summary Wrapper around React-Native scroll view export
 *
 * @param {Object} props - see View PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {String} props.innerClassName - Value to set the innerClassName to (web platform only)
 *
 */
export const ScrollView = React.forwardRef(
  ({ className, innerClassName, ...props }, ref) => {
    const classRef = useScrollClassNames(
      'keg-scrollview',
      className,
      innerClassName,
      ref
    )

    return <RNScrollView
      {...props}
      ref={classRef}
    />
  }
)

ScrollView.propTypes = {
  ...RNScrollView.propTypes,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  innerClassName: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
}
