import React, { useState, forwardRef } from 'react'
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

const buildStyles = (style, styles, theme, type) => {

  const defStyle = theme.get(
    checkCall(get(theme, 'transition.opacity')),
    `components.image.${type}`,
  )

  const imgStyle = theme.get(
    styles.image,
    style
  )

  const loading = theme.get(
    defStyle,
    'components.image.loading',
    imgStyle,
    { width: 0, height: 0 }
  )

  const loaded = theme.get(
    defStyle,
    'components.image.loaded',
    imgStyle,
  )

  const loadingComp = theme.get(
    { width: loaded.width, height: loaded.height },
    styles.loading,
  )

  const hover = theme.get(
    'components.image.hover',
    styles.hover,
  )

  const wrapper = theme.get(
    'components.image.wrapper',
    styles.wrapper,
  )

  return { hover, loading, loadingComp, loaded, wrapper }
}

/**
 * ImageWrapper
 * @summary Custom image wrapper component. All props are optional
 *
 * @param {Object} props - see buttonPropTypes
 * @property {string} props.alt - Alternate text when image fails to load
 * @property {Function} props.onPress - function to do when image is pressed
 * @property {String} props.src - Source url of the image
 * @property {Object} props.style - custom style
 * @property {string} props.type - image type
 * @property {Boolean} props.useLoading - (defaults true) if true, show a loading spinner for remote sources until they load
 *
 */
export const ImageWrapper = forwardRef((props, ref) => {
  const theme = useTheme()
  const [ loading, setLoading ] = useState(true)
  
  const {
    alt,
    children,
    Element,
    isWeb,
    onClick,
    onPress,
    src,
    source,
    style,
    styles,
    type,
    useLoading=true,
    ...attrs
  } = props

  const builtStyles = buildStyles(
    style,
    styles || {},
    theme,
    type || 'default'
  )

  const [ useRef, useStyle, setStyle ] = useThemeHover(
    builtStyles.loaded,
    builtStyles.hover,
    { ref }
  )

  return (
    <View style={ builtStyles.wrapper }>

      { loading && useLoading &&
          <Loading
            type={ 'image' }
            style={ builtStyles.loadingComp }
          />
      }

      <Element
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

})

ImageWrapper.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  style: PropTypes.object,
}