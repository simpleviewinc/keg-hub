import React from 'react'
import { useTheme, useThemeActive } from 're-theme'
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
export const Button = props => {
  const theme = useTheme()
  
  const {
    text,
    type,
    style,
    onClick,
    onPress,
    disabled,
    children,
    ref,
    ...btnProps
  } = props

  const btnStyle = theme.join(theme, [
    [ 'components', 'button', 'default' ],
    [ 'components', 'button', type ],
    disabled && [ 'components', 'button', 'disabled' ],
  ], style)

  const activeStyle = get(theme, [ 'components', 'button', 'active' ])
  const [ activeRef, useStyle ] = useThemeActive(btnStyle, activeStyle, { ref })
  
  const content = children || text  || 'button'

  return (
    <button
      { ...btnProps }
      ref={ activeRef }
      onClick={ onClick || onPress }
      disabled={ disabled }
      style={ useStyle }
    >
      { content }
    </button>
  )

}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string,
}
