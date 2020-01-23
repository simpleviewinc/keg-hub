import React from 'react'
import { withTheme } from 're-theme'
import { Text } from 'react-native'

const textWrapper = El => {
  return withTheme(props => {
    const { theme, style, children, ...attrs } = props
    const textStyles = (theme.text && theme.text[El]) || theme[El]

    return (
      <Text {...attrs} style={theme.join(textStyles, style)}>
        { children }
      </Text>
    )
  })
}

export { textWrapper }
