import PropTypes from 'prop-types'
import React from 'react'
import { ButtonWrapper } from './button.wrapper'
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

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
const Element = React.forwardRef(({ elProps, children, ...props}, ref) => (
  <Touchable
    { ...elProps }
    { ...props }
    ref={ ref }
  >
    { children }
  </Touchable>
))

export const Button = props => (
  <ButtonWrapper
    styleId={ `keg-native-button` }
    { ...props }
    Element={ Element }
    elType='native'
  />
)

Button.propTypes = {
  ...TouchableOpacity.propTypes,
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