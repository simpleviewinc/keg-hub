import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { Text } from '../../'

export const Option = withTheme(props => {
  const { theme, children, style, text, ...args } = props
  const optionStyle = theme.join(get(theme, ['form', 'option' ]), style)
  
  return (<Text { ...args } style={ optionStyle } >{ text }</Text>)

})

Option.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
}