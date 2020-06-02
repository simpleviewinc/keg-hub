import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { indicatorUri } from '../../assets/spinners/moderate'
import { getImgSrc } from '../../utils'
import { View } from 'KegView'
import { useThemePath } from 'KegHooks'

export const IndicatorWrapper = props => {
  const {
    alt,
    Element,
    isWeb,
    resizeMode,
    src,
    source,
    styles,
    type='default',
    themePath,
  } = props

  const theme = useTheme()
  const [ builtStyles ] = useThemePath(themePath || `indicator.${type}`, styles)

  return (
    <View style={ builtStyles.container } >
      <Element
        alt={ alt || 'Loading' }
        style={ builtStyles.icon }
        resizeMode={ resizeMode || 'contain' }
        { ...getImgSrc(isWeb, src, source, indicatorUri) }
      />
    </View>
  )
}