import React from 'react'
import { withTheme } from 're-theme'
import { View, Text } from 'SVComponents/native'

const stylesCenter = {
  justifyContent: 'center',
  alignItems: 'center',
}

/**
 * Default Container that's displayed when Container-Key Mapping is not found
 */
export const PageNotFoundContainer = withTheme(props => {
  const { theme } = props
  const headerText = theme.join(
    theme.text.h6,
    theme.margin.bottom,
    theme.text.align.center
  )
  return (
    <View style={stylesCenter}>
      <Text style={headerText}>Default Page Not Found!</Text>
    </View>
  )
})
