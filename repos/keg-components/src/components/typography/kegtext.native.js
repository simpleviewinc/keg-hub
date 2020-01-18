import React from 'react'
import { withTheme } from 'KegReTheme'
import { Text as RNText } from 'react-native'

export const KegText = element => {
  return withTheme(props => {
    const { children, style, styleId, theme, ...attrs } = props

    // Get the styles for the text element
    const textStyles = theme.get(
      styleId || `keg-typography-${element}`,
      'typography.font.family',
      'typography.default',
      element && `typography.${element}`
    )

    return (
      <RNText {...attrs} style={ theme.join(textStyles, style) }>
        { children }
      </RNText>
    )
  })
}
