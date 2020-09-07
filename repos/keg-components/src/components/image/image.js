import React, { forwardRef } from 'react'
import { Image as RNImage } from 'react-native'
import PropTypes from 'prop-types'
import { ImageWrapper } from './image.wrapper'
import { getPlatform } from 'KegGetPlatform'
import { useClassName } from '../../hooks/useClassName'

const isWeb = getPlatform() === 'web'

/**
 * Image
 * @summary Custom image component. All props are optional
 *
 * @param {Object} props - see buttonPropTypes
 * @property {string} props.alt - Alternate text when image fails to load
 * @property {Function} props.onPress - function to do when image is pressed
 * @property {String} props.src - Source url of the image
 * @property {Object} props.style - custom style
 * @property {string} props.type - image type
 *
 */
const Element = forwardRef(
  ({ className, dataSet, attrs, src, ...props }, ref) => {
    const imgRef = useClassName(className, dataSet, ref)

    return (
      <RNImage
        accessibilityLabel='img'
        {...attrs}
        {...props}
        ref={imgRef}
      />
    )
  }
)

export const Image = forwardRef((props, ref) => (
  <ImageWrapper
    {...props}
    ref={ref}
    Element={Element}
    isWeb={isWeb}
  />
))

Image.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  style: PropTypes.object,
}
