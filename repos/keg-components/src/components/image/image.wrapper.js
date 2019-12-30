import React, { useState } from 'react'
import { useTheme, useThemeHover } from 're-theme'
import { get, checkCall, isObj, isStr, uuid } from 'jsutils'
import PropTypes from 'prop-types'
import { Loading } from '../'
import { View } from 'KegView'

const getImgSrc = (isWeb, src, source) => {
  const imgSrc = src || source
  const key = isWeb ? 'src' : 'source'
  
  return {
    [ key ]: isWeb
      ? isObj(imgSrc) ? imgSrc.uri : imgSrc
      : isStr(imgSrc) ? { uri: imgSrc } : imgSrc
  }
} 

const getOnLoad = (isWeb, setLoading, props, setStyle, loadedStyle) => {
  const key = isWeb ? 'onLoad' : 'onLoadEnd'

  return {
    [key]: (event) => {
      checkCall(setLoading, false)
      checkCall(setStyle, loadedStyle)
      checkCall(props.onLoad, event, props)
    }
  }
}

const getPressHandler = (isWeb, onClick, onPress) => {
  return { [ isWeb ? 'onClick' : 'onPress' ]: onClick || onPress }
}


const buildStyles = (styleId, theme, style, styles, type) => {
  styleId = styleId || uuid()

  const defStyle = theme.join(
    theme.transition.opacity(),
    get(theme, [ 'components', 'image', type ]),
    `${styleId}-${type}`
  )

  const imgStyle = theme.join(
    styles.image,
    style,
    `${styleId}-image`
  )

  const loading = theme.join(
    defStyle,
    get(theme, [ 'components', 'image', 'loading' ]),
    imgStyle,
    { width: 0, height: 0 },
    `${styleId}-loading`
  )

  const loaded = theme.join(
    defStyle,
    get(theme, [ 'components', 'image', 'loaded' ]),
    imgStyle,
    `${styleId}-loaded`
  )

  const loadingComp = theme.join(
    { width: loaded.width, height: loaded.height },
    styles.loading,
    `${styleId}-loadingComp`
  )

  const hover = theme.join(
    get(theme, [ 'components', 'image', 'hover' ]),
    styles.hover,
    `${styleId}-hover`
  )

  const wrapper = theme.join(
    get(theme, [ 'components', 'image', 'wrapper' ]),
    styles.wrapper,
    `${styleId}-wrapper`
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
  const builtStyles = buildStyles(styleId, theme, style, styles || {}, type || 'default')

  const [ useRef, useStyle, setStyle ] = useThemeHover(
    builtStyles.loaded,
    builtStyles.hover,
    { ref }
  )

  return (
    <View style={ builtStyles.wrapper }>
      { loading && (<Loading type={ 'image' } style={ builtStyles.loadingComp } />)}
      <Img
        ref={ useRef }
        attrs={ attrs }
        alt={ alt }
        style={ loading ? builtStyles.loading : useStyle }
        { ...getPressHandler(isWeb, onClick, onPress) }
        { ...getImgSrc(isWeb, src, source) }
        { ...getOnLoad(isWeb, setLoading, props, setStyle, builtStyles.loaded) }
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