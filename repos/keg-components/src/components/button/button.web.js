import React from 'react'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

/**
 * Button
 * @summary Custom button component. All props are optional
 *
 * @param {Object} props - see buttonPropTypes
 * @property {String} props.text - button text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {Object} props.style - custom style
 * @property {Function} props.onPress - function to do when button is pressed
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} props.ref - reference to native element
 *
 */
export const Button = () => {
  const theme = useTheme()
  
  const {
    text,
    type,
    style,
    onPress,
    disabled,
    children,
    ref,
  } = props

  const buttonStyle = get(theme, [ 'components', 'button', type || 'default' ])
  const content = children || text  || 'button'

  return (
    <button
    ref={ref}
    onClick={onPress}
    disabled={disabled}
    style={theme.join(buttonStyle, style)}
    >
      { content }
    </button>
  )

}

const buttonPropTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  children: PropTypes.object,
  ref: PropTypes.object,
}

Button.propTypes = buttonPropTypes