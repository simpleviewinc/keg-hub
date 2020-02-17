import React from 'react'
import { useTheme } from 're-theme'
import { indicatorUri } from '../../assets/spinners/moderate'
import { getImgSrc } from '../../utils'
import { View } from 'KegView'

const buildStyles = (theme, style, styles, isWeb) => {
  const built = {}

  built.img = theme.get(
    'components.indicator.image',
    styles.image,
    style,
  )

  built.wrapper = theme.get(
    'components.indicator.wrapper',
    styles.wrapper,
  )

  return built
}


export const IndicatorWrapper = props => {
  const {
    alt,
    Element,
    isWeb,
    resizeMode,
    src,
    source,
    style,
    styles,
  } = props

  const theme = useTheme()
  const builtStyles = buildStyles(theme, style, styles || {}, isWeb)

  return (
    <View style={ builtStyles.wrapper } >
      <Element
        alt={ alt || 'Loading' }
        style={ builtStyles.img }
        resizeMode={ resizeMode || 'contain' }
        { ...getImgSrc(isWeb, src, source, indicatorUri) }
      />
    </View>
  )
}