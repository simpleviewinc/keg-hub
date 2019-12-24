import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

export const Input = withTheme(props => {
  const { theme, children, style, onClick, onPress, ...args } = props

  return (
    <input
      { ...args }
      style={ theme.join(get(theme, ['form', 'input' ]), style) }
      onClick={ onClick || onPress }
    />
  )
})