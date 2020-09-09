import { View } from 'KegView'
import PropTypes from 'prop-types'
import { Loading } from '../loading'
import { checkCall } from '@keg-hub/jsutils'
import { Image as RNImage } from 'react-native'
import { useThemeHover } from '@keg-hub/re-theme'
import { useThemePath, useStyle } from 'KegHooks'
import React, { useState, forwardRef } from 'react'
import { useClassName } from '../../hooks/useClassName'
import { useClassList } from '../../hooks/useClassList'
import { getImgSrc, getPressHandler, getOnLoad } from 'KegUtils'

const onLoadEvent = (setLoading, props, setStyle, loadedStyle) => {
  return event => {
    checkCall(setLoading, false)
    checkCall(setStyle, loadedStyle)
    checkCall(props.onLoad, event, props)
  }
}

/**
 * Image
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
export const Image = forwardRef((props, ref) => {
  const [ loading, setLoading ] = useState(true)

  const {
    alt,
    className,
    children,
    imageClassName,
    isWeb,
    onClick,
    onPress,
    src,
    source,
    styles,
    type = 'default',
    themePath = `image.${type}`,
    useLoading = true,
    ...attrs
  } = props

  const builtStyles = useThemePath(themePath, styles)
  const loadingStyles = useStyle(builtStyles.loading, builtStyles.image)
  const loadedStyles = useStyle(loadingStyles, builtStyles.loaded)
  const imgClsRef = useClassName('keg-image', imageClassName, ref)

  const [ imgRef, elementStyle, setStyle ] = useThemeHover(
    loadedStyles,
    builtStyles.hover,
    { imgClsRef }
  )

  return (
    <View
      className={useClassList(`keg-image-container`, className)}
      style={builtStyles.container}
    >
      { loading && useLoading && (
        <Loading
          className='keg-image-loading'
          styles={builtStyles.loadingComp}
        />
      ) }
      <RNImage
        accessibilityLabel='image'
        {...attrs}
        style={loading ? loadingStyles : builtStyles.image}
        {...getPressHandler(false, onClick, onPress)}
        {...getImgSrc(false, src, source)}
        {...getOnLoad(
          false,
          onLoadEvent(setLoading, props, setStyle, elementStyle)
        )}
        alt={alt}
        ref={imgRef}
      />
    </View>
  )
})

Image.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  style: PropTypes.object,
}
