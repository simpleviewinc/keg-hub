import PropTypes from 'prop-types'
import React from 'react'
import { SwitchWrapper } from './switch.wrapper'
import { Switch as RNSwitch, TouchableOpacity } from 'react-native'

/**
 * Switch
 * @summary Custom switch component. All props are optional
 *
 * @param {Object} props - see switchPropTypes
 * @property {String} props.text - switch text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {Object} props.style - custom style
 * @property {Function} props.onPress - function to do when switch is pressed
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} props.ref - reference to native element
 *
 */
const Element = React.forwardRef(({ elProps, children, ...props }, ref) => (
  <RNSwitch
    { ...elProps }
    { ...props }
    ref={ ref }
  >
    { children }
  </RNSwitch>
))

export const Switch = props => (
  <SwitchWrapper
    styleId={ `keg-native-switch` }
    { ...props }
    Element={ Element }
  />
)

Switch.propTypes = {
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
