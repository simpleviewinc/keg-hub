import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { Text } from '../../'

export const CheckBox = withTheme(props => {
  const { theme, style, children, onClick, onPress, text, ...args } = props
  const checkboxStyle = theme.join(get(theme, ['form', 'checkbox' ]), style)

  return (<Text { ...args } style={ checkboxStyle } >{ text }</Text>)

})

CheckBox.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
}