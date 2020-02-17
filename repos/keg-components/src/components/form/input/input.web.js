import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

export const Input = withTheme(props => {
  const { theme, children, style, onClick, onPress, ...args } = props

  return (
    <input
      { ...args }
      style={ theme.join(get(theme, ['form', 'input', 'default' ]), style) }
      onClick={ onClick || onPress }
    />
  )
})

Input.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
}
