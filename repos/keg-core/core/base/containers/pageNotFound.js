import React from 'react'
import { View, Text } from 'SVComponents'

const stylesCenter = {
  justifyContent: 'center',
  alignItems: 'center',
}

/**
 * Default Container that's displayed when Container-Key Mapping is not found
 */
export const PageNotFoundContainer = () => {

  return (
    <View style={stylesCenter}>
      <Text>Default Page Not Found!</Text>
    </View>
  )
}
