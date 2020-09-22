import React from 'react'
import { ScrollView as RNScrollView } from 'react-native'
import { useClassName } from 'KegClassName'
import PropTypes from 'prop-types'

/**
 * ScrollView
 * @summary Wrapper around React-Native scroll view export
 *
 * @param {Object} props - see View PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const ScrollView = React.forwardRef(({ className, ...props }, ref) => {
  const classRef = useClassName('keg-scroll-view', className, ref)

  return (
    <RNScrollView
      {...props}
      ref={classRef}
    />
  )
})

ScrollView.propTypes = {
  ...RNScrollView.propTypes,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ])
}
