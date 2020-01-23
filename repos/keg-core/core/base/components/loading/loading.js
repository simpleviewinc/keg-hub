import React from 'react'
import { withTheme } from 're-theme'
import { getOrThrow } from 'SVUtils'
import { Text, View } from 'SVComponents'

export const Loading = withTheme(props => {
  const { theme, text, style } = props

  return (
    <View
      style={theme.join(
        getOrThrow(theme, 'margin.all'),
        getOrThrow(theme, 'components.loading.wrapper'),
        style
      )}
    >
      { text && <Text>{ text }</Text> }
    </View>
  )
})
