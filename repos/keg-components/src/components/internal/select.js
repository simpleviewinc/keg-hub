import React from 'react'
import PropTypes from 'prop-types'
import { Picker } from 'react-native'
import { useClassName } from 'KegClassName'

/**
 * Switch
 * @summary Wraps the React Native picker component. All props are optional
 *
 * @param {Object} props - see switchPropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const Select = React.forwardRef(({ className, ...props }, ref) => {
  const classRef = useClassName('keg-select', className, ref)

  return <Picker
    {...props}
    ref={classRef}
  />
})

Select.propTypes = {
  ...Picker.propTypes,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
}
