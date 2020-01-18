import React from 'react'
import { useTheme } from 'KegReTheme'
import { indicatorUri } from '../../assets/spinners/moderate'
import { getImgSrc } from '../../utils'
import { View } from 'KegView'

const buildStyles = (theme, style, styles, styleId, isWeb) => {
  const built = {}
  styleId = styleId || `keg-${ isWeb ? 'web' : 'native' }-indicator`

  built.img = theme.get(
    `${styleId}-image`,
    'components.indicator.image',
    styles.image,
    style,
  )

  built.wrapper = theme.get(
    `${styleId}-wrapper`,
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
    styleId
  } = props

  const theme = useTheme()
  const builtStyles = buildStyles(theme, style, styles || {}, styleId, isWeb)

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