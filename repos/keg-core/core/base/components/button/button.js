import React from 'react'
import { withTheme } from 're-theme'
import PropTypes from 'prop-types'
import { View } from 'SVComponents'
import { Button as RNButton } from 'react-native'
import { get } from 'jsutils'

/**
 * Button
 * @summary Custom button component. All props are optional
 *
 * @param {Object} props - see buttonPropTypes
 * @property {String} props.theme - SVTheme
 * @property {String} props.text - button text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {String} props.icon - icon name
 * @property {Object} props.style - custom style
 * @property {Function} props.onPress - function to do when button is pressed
 * @property {String} props.textColor - text color
 * @property {String} props.color - button color
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} props.ref - reference to
 *
 */
export const Button = withTheme(props => {
  const {
    theme,
    text,
    type,
    icon,
    style,
    onPress,
    textColor,
    color,
    disabled,
    children,
    ref,
  } = props

  const bgColor = color || get(theme, [ 'colors', 'primary', 'main' ])
  const buttonStyle = get(theme, [ 'components', 'button', 'default' ])

  return (
    <View>
      <RNButton
        ref={ref}
        icon={<Icon name={icon} />}
        text={text || 'button'}
        textColor={textColor}
        type={type || 'flat'}
        onPress={onPress}
        disabled={disabled}
        color={bgColor}
        style={theme.join(buttonStyle, style)}
      >
        { children }
      </RNButton>
    </View>
  )
})

const buttonPropTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  children: PropTypes.object,
  ref: PropTypes.object,
}

Button.propTypes = buttonPropTypes
