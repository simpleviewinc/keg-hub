import React from 'react'
import { withTheme } from 're-theme'
import { Text as RNText } from 'react-native'

export const Text = element => {
  return withTheme(props => {
    const { theme, style, children, ...attrs } = props
    const textStyles = (theme.typeface && theme.typeface[element]) || theme[element]

    return (
      <RNText {...attrs} style={theme.join(textStyles, style)}>
        { children }
      </RNText>
    )
  })
}
