import React from 'react'
import { View as RNView } from 'react-native'
import { useClassName } from 'KegClassName'
import PropTypes from 'prop-types'

/**
 * View
 * @summary Default view component that wraps the React Native View component. All props are optional
 *
 * @param {Object} props - see View PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const View = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    const classRef = useClassName('keg-view', className, ref)

    return (
      <RNView
        {...props}
        ref={classRef}
      >
        { children }
      </RNView>
    )
  }
)

View.propTypes = {
  ...RNView.propTypes,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
}
