import React from 'react'
import { View } from 'KegView'
import { useThemePath } from 'KegHooks'

export const IndicatorWrapper = props => {
  const {
    alt,
    Element,
    isWeb,
    resizeMode,
    size,
    styles,
    type = 'default',
    themePath,
    ...elProps
  } = props

  const [builtStyles] = useThemePath(themePath || `indicator.${type}`, styles)

  return (
    <View style={builtStyles.container}>
      <Element
        {...elProps}
        alt={alt || 'Loading'}
        style={builtStyles.icon}
        size={size}
        resizeMode={resizeMode || 'contain'}
      />
    </View>
  )
}
