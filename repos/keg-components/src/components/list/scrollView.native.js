import React from 'react'
import PropTypes from 'prop-types'
import { useScrollClassName } from 'KegScrollClassName'
import { ScrollView as RNScrollView } from 'react-native'

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
    const classRef = useScrollClassName(
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
