import React from 'react'
import { withTheme } from 're-theme'

const textWrapper = (El, themeKey) => {
  return withTheme(props => {
    const { theme, style, children, ...attrs } = props
    const textStyles = (theme.text && (theme.text[themeKey] || theme.text[El])) || theme[El]

    return (
      <El {...attrs} style={theme.join(textStyles, style)}>
        { children }
      </El>
    )
  })
}

export { textWrapper }
