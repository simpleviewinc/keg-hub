import React from 'react'
import { useClassName } from 'KegClassName'
import { Switch as RNSwitch } from 'react-native'
import PropTypes from 'prop-types'

/**
 * Switch
 * @summary Wraps the React Native switch component. All props are optional
 *
 * @param {Object} props - see switchPropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const Switch = React.forwardRef(({ className, ...props }, ref) => {
  const classRef = useClassName('keg-switch', className, ref)

  return <RNSwitch
    {...props}
    reg={classRef}
  />
})

Switch.propTypes = {
  ...RNSwitch.propTypes,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
}
