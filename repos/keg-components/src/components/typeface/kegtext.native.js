import React from 'react'
import { withTheme } from 're-theme'
import { Text as RNText } from 'react-native'

export const KegText = element => {
  return withTheme(props => {
    const { theme, style, children, ...attrs } = props

    // Get the styles for the text element
    const textStyles = theme.join(theme, [
      [ 'typeface', 'font', 'family' ],
      [ 'typeface', 'default' ],
      [ 'typeface', element ]
    ])

    return (
      <RNText {...attrs} style={theme.join(textStyles, style)}>
        { children }
      </RNText>
    )
  })
}
