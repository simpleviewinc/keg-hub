import React, { forwardRef } from 'react'
import { TextInput } from 'react-native'
import { useClassName } from 'KegClassName'
import PropTypes from 'prop-types'
import { withTouch } from '../../hocs'

/**
 * Input
 * @summary Wraps the React Native Input component with the Touchable component
 * <br/>Also extracts the className from props. All props are optional
 *
 * @param {Object} props - see KegInput PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const Input = forwardRef(({ className, ...props }, ref) => {
  const classRef = useClassName('keg-input', className, ref)
  const TextInputTouch = withTouch(TextInput, { showFeedback: false })

  return (
    <TextInputTouch
      accessibilityRole='textbox'
      {...props}
      ref={classRef}
    />
  )
})

Input.propTypes = {
  ...TextInput.propTypes,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
}
