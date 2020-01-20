import React from 'react'
import { withTheme } from 'KegReTheme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { Text } from '../../typography/text'

export const Checkbox = withTheme(props => {
  const { theme, style, children, onClick, onPress, text, ...args } = props
  const checkboxStyle = theme.join(get(theme, ['form', 'checkbox' ]), style)

  return (<Text { ...args } style={ checkboxStyle } >{ text }</Text>)

})

Checkbox.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
}
