import PropTypes from 'prop-types'
import React from 'react'
import { useTheme } from 're-theme'
import { get, isFunc } from 'jsutils'
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'

const buttonActions = [
  'onPress',
  'onPressIn',
  'onPressOut',
  'onLongPress',
  'delayPressIn',
  'delayPressOut',
  'delayLongPress',
]

/**
 * Gets the props for the button, based on the disabled state
 * @param {*} props - Props passed to the button from the parent
 * @param {*} disabled - State of button
 * @param {*} [disabledStyle={}] - Styles to use when the button is disabled
 *
 * @returns {Object} - built button props
 */
const getBtnProps = (props, disabled, disabledStyle={}) => {
  
  const btnProps = {}
  // Check if opacity is passed from the props, or use the opacity from disabled styles
  btnProps.activeOpacity = props.activeOpacity || props.opacity || disabledStyle.opacity || 0.3

  if(disabled) return btnProps
  
  // Map the touch actions props to the button props
  buttonActions.map(action => isFunc(props[action]) && ( btnProps[action] = props[action] ))

  // Map all other props to the btnProps except for onClick
  Object.keys(props).map(key => 
    key !== 'onClick' && buttonActions.indexOf(key) === -1 && ( btnProps[key] = props[key] )
  )

  // Add the onClick action if onPress is not set
  btnProps.onPress = btnProps.onPress || props.onClick

  return btnProps
}

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
    disabled,
    children,
    ...otherProps
  } = props

  const btnStyle = theme.join(theme, [
    [ 'components', 'button', 'default' ],
    [ 'components', 'button', type ],
  ], style)

  const disabledStyle = disabled && get(theme, [ 'components', 'button', 'disabled' ])
  const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  const btnProps = getBtnProps(otherProps, disabled, disabledStyle)

  return (
    <Touchable
      { ...btnProps }
      style={ theme.join(btnStyle, disabledStyle) }
      accessibilityRole="button"
    >
      { children || text  || 'button' }
    </Touchable>
  )

}

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  accessibilityLabel: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  style: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string,
}