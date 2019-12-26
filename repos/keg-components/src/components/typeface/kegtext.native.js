import React from 'react'
import { withTheme } from 're-theme'
import { Text as RNText } from 'react-native'
import { get } from 'jsutils'

export const KegText = element => {
  return withTheme(props => {
    const { theme, style, children, ...attrs } = props
    const useFont = get(theme, [ 'typeface', 'font', 'family' ])
    const textStyles = (theme.typeface && theme.typeface[element]) || theme[element]

    return (
      <RNText {...attrs} style={theme.join(useFont, textStyles, style)}>
        { children }
      </RNText>
    )
  })
}
