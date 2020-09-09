import { View } from 'KegView'
import PropTypes from 'prop-types'
import { Loading } from '../loading'
import { checkCall, isFunc } from '@keg-hub/jsutils'
import { Image as RNImage } from 'react-native'
import { useThemeHover } from '@keg-hub/re-theme'
import { useThemePath, useStyle } from 'KegHooks'
import React, { useState, forwardRef, useRef, useCallback } from 'react'
import { useClassList } from '../../hooks/useClassList'
import { getImgSrc, getPressHandler } from 'KegUtils'
import { getPlatform } from 'KegGetPlatform'
const isWeb = getPlatform() === 'web'

/**
 * Custom class helper for images due to a bug in react-native-web
 * <br/>Can't use useClassName hook, for some reason when setting the ref on the image
 * <br/>If causes constant re-renders. Maybe worth looking into at some point
 * <br/>We have to manually add the keg class names to the image dom element when the image loads
 * @param {Element} element - Native dom element
 */
const addImageClasses = element => {
  if (!isWeb || !element || !element.classList) return

  element.classList.add(`keg-image-content`)
  element.firstChild.classList.add(`keg-image-sibling`)
  element.lastChild.classList.add(`keg-image`)
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
  const internalRef = ref || useRef(null)

  const {
    alt,
    className,
    children,
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

  const [ imgRef, elementStyle, setStyle ] = useThemeHover(
    loadedStyles,
    builtStyles.hover,
    { internalRef }
  )

  // Listen for updates to the image loading
  const onLoad = useCallback(() => {
    // Update state that the image is loaded
    checkCall(setLoading, false)
    // Update the style to use for the loaded image - So we can see it
    checkCall(setStyle, elementStyle)
    // Call onLoad in props if it exists
    checkCall(props.onLoad, props)
    // Can only update the dom node if it exists, so check before doing the udpate
    if (!internalRef.current) return

    isFunc(imgRef) && imgRef(internalRef.current)
    isWeb && addImageClasses(internalRef.current)
  }, [ src, source, internalRef.current ])

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
        onLoadEnd={onLoad}
        alt={alt}
        ref={internalRef}
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
