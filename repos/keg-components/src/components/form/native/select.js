import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { Text } from '../../'

export const Select = withTheme(props => {
  const { theme, style, children, text, ...args } = props
  const selectStyle = theme.join(get(theme, ['form', 'select' ]), style)
  
  return (<Text { ...args } style={ selectStyle } >{ text }</Text>)
})

Select.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
}