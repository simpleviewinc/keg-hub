import React from 'react'
import { useTheme } from 're-theme'

export const UseThemeButton = props => {
  const theme = useTheme()
  return (
    <button style={ theme.components.button.default } >
      { props.children }
    </button>
  )
}
