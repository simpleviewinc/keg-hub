import React from 'react'
import { ActivityIndicator } from 'react-native'
import { IndicatorWrapper } from './indicator.wrapper'
import { View } from 'KegView'

const Element = ({ style = {}, size, color, ...attrs }) => {
  return (
    <View>
      <ActivityIndicator
        size={size}
        color={style.color || color}
      />
    </View>
  )
}

export const Indicator = ({ alt, size, color, styles, ...props }) => {
  return (
    <IndicatorWrapper
      {...props}
      alt={alt || 'Loading'}
      size={[ 'large', 'small' ].includes(size) ? size : 'large'}
      color={color}
      Element={Element}
      styles={styles}
    />
  )
}
