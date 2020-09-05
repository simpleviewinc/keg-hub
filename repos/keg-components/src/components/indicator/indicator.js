import React from 'react'
import { ActivityIndicator } from 'react-native'
import { IndicatorWrapper } from './indicator.wrapper'
import { View } from 'KegView'
import { getPlatform } from 'KegGetPlatform'
import { spacedJoin } from '../../utils/helpers/spacedJoin'

const isWeb = getPlatform() === 'web'

const Element = ({ className, dataSet, style = {}, size, color, ...attrs }) => {
  
  return (
    <View
      className={spacedJoin(className, 'keg-indicator')}
      dataSet={dataSet}
    >
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
      isWeb={isWeb}
    />
  )
}
