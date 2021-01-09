import { View } from 'KegView'
import PropTypes from 'prop-types'
import { Loading } from '../loading'
import { checkCall, isFunc } from '@keg-hub/jsutils'
import { Image as InternalImage } from '../internal/image'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'
import { useThemePath } from 'KegHooks'
import React, { useState, forwardRef, useRef, useCallback } from 'react'
import { useClassList } from 'KegClassList'
import { getImgSrc, getPressHandler } from 'KegUtils'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

const KegImage = StyleInjector(InternalImage, {
  displayName: 'Image',
  className: 'keg-image',
})

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
    // Call the imgRef function or set it if it exists
    isFunc(imgRef)
      ? imgRef(internalRef.current)
      : imgRef && (imgRef.current = internalRef.current)
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
      <KegImage
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
  ...InternalImage.propTypes,
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  styles: PropTypes.object,
}
