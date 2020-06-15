import React from 'react'
import { IndicatorWrapper } from './indicator.wrapper'
import { Icon } from 'KegIcon'
import { View } from 'KegView'
import { useSpin } from 'KegHooks'

const Element = ({ style = {}, name, ...attrs }) => {
  const [spinRef] = useSpin()
  return (
    <View ref={spinRef}>
      <Icon
        name={name || 'spinner'}
        color={style.color || attrs.color}
        size={style.fontSize || attrs.size || 40}
      />
    </View>
  )
}

export const Indicator = ({ alt, src, source, styles }) => (
  <IndicatorWrapper
    alt={alt || 'Loading'}
    Element={Element}
    isWeb={true}
    src={src || source}
    styles={styles}
  />
)
