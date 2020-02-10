import React from 'react'
import { withTheme } from 're-theme'

export const WithThemeButton = withTheme(props => {
  const { theme } = props
  return (
    <button style={ theme.components.button.default } >
      { props.children }
    </button>
  )
})