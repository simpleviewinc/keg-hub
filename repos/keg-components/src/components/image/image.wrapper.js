import React, { useState, forwardRef } from 'react'
import { useThemeHover } from '@simpleviewinc/re-theme'
import { checkCall } from 'jsutils'
import PropTypes from 'prop-types'
import { Loading } from '../loading'
import { View } from 'KegView'
import { getImgSrc, getPressHandler, getOnLoad } from 'KegUtils'
import { useThemePath, useStyle } from 'KegHooks'

const onLoadEvent = (setLoading, props, setStyle, loadedStyle) => {
  return event => {
    checkCall(setLoading, false)
    checkCall(setStyle, loadedStyle)
    checkCall(props.onLoad, event, props)
  }
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
    styles = {},
    type = 'default',
    themePath,
    useLoading = true,
    ...attrs
  } = props

  const [builtStyles] = useThemePath(themePath || `image.${type}`, styles)
  const loadingStyles = useStyle(builtStyles.loading, builtStyles.image)
  const loadedStyles = useStyle(loadingStyles, builtStyles.loaded)

  const [ , elementStyle, setStyle ] = useThemeHover(
    loadedStyles,
    builtStyles.hover,
    { ref }
  )

  return (
    <View style={builtStyles.container}>
      { loading && useLoading && <Loading styles={builtStyles.loadingComp} /> }

      <Element
        ref={ref}
        attrs={attrs}
        alt={alt}
        style={loading ? loadingStyles : builtStyles.image}
        {...getPressHandler(isWeb, onClick, onPress)}
        {...getImgSrc(isWeb, src, source)}
        {...getOnLoad(
          isWeb,
          onLoadEvent(setLoading, props, setStyle, elementStyle)
        )}
      />
    </View>
  )
})

ImageWrapper.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  style: PropTypes.object,
}
