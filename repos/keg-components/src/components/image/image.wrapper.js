import React, { useState } from 'react'
import { useTheme, useThemeHover } from 're-theme'
import { get, checkCall } from 'jsutils'
import PropTypes from 'prop-types'
import { Loading } from '../loading'
import { View } from 'KegView'
import { getImgSrc, getPressHandler, getOnLoad } from '../../utils'

const onLoadEvent = (setLoading, props, setStyle, loadedStyle) => {
  return event => {
    checkCall(setLoading, false)
    checkCall(setStyle, loadedStyle)
    checkCall(props.onLoad, event, props)
  }
}

const buildStyles = (style, styles, styleId, theme, type, imgType) => {
  styleId = styleId || `keg-${imgType}-image`

  const defStyle = theme.get(
    `${styleId}-${type}`,
    checkCall(get(theme, 'transition.opacity')),
    `components.image.${type}`,
  )

  const imgStyle = theme.get(
    `${styleId}-image`,
    styles.image,
    style
  )

  const loading = theme.get(
    `${styleId}-loading`,
    defStyle,
    'components.image.loading',
    imgStyle,
    { width: 0, height: 0 }
  )

  const loaded = theme.get(
    `${styleId}-loaded`,
    defStyle,
    'components.image.loaded',
    imgStyle,
  )

  const loadingComp = theme.get(
    `${styleId}-loadingComp`,
    { width: loaded.width, height: loaded.height },
    styles.loading,
  )

  const hover = theme.get(
    `${styleId}-hover`,
    'components.image.hover',
    styles.hover,
  )

  const wrapper = theme.get(
    `${styleId}-wrapper`,
    'components.image.wrapper',
    styles.wrapper,
  )

  return { hover, loading, loadingComp, loaded, wrapper }
}

/**
 * Image
 * @summary Custom image component. All props are optional
 *
 * @param {Object} props - see buttonPropTypes
 * @property {string} props.alt - Alternate text when image fails to load
 * @property {Function} props.onPress - function to do when image is pressed
 * @property {Object} props.ref - reference to native element
 * @property {String} props.src - Source url of the image
 * @property {Object} props.style - custom style
 * @property {string} props.type - image type
 *
 */
export const ImageWrapper = props => {
  const theme = useTheme()
  const [ loading, setLoading ] = useState(true)
  
  const {
    alt,
    children,
    imgType,
    Img,
    onClick,
    onPress,
    ref,
    src,
    source,
    style,
    styles,
    styleId,
    type,
    ...attrs
  } = props
  
  const isWeb = imgType === 'web'
  const builtStyles = buildStyles(
    style,
    styles || {},
    styleId,
    theme,
    type || 'default',
    imgType
  )

  const [ useRef, useStyle, setStyle ] = useThemeHover(
    builtStyles.loaded,
    builtStyles.hover,
    { ref }
  )

  return (
    <View style={ builtStyles.wrapper }>

      { loading && (
        <Loading
          type={ 'image' }
          style={ builtStyles.loadingComp }
        />
      )}

      <Img
        ref={ useRef }
        attrs={ attrs }
        alt={ alt }
        style={ loading ? builtStyles.loading : useStyle }
        { ...getPressHandler(isWeb, onClick, onPress) }
        { ...getImgSrc(isWeb, src, source) }
        { ...getOnLoad(isWeb, onLoadEvent(setLoading, props, setStyle, builtStyles.loaded)) }
      />

    </View>
  )

}

ImageWrapper.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  style: PropTypes.object,
  ref: PropTypes.object,
}