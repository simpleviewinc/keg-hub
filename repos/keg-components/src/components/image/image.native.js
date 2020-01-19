import React from 'react'
import { Image as RNImage } from 'react-native'
import PropTypes from 'prop-types'
import { ImageWrapper } from './image.wrapper'

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
const Element = React.forwardRef(({ attrs, src, ...props }, ref) => (
  <RNImage
    { ...attrs }
    { ...props }
    ref={ ref }
  />
))

export const Image = props => (
  <ImageWrapper
    { ...props }
    styleId={ props.styleId || `keg-native-image` }
    Element={ Element }
  />
)

Image.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  styleId: PropTypes.string,
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  style: PropTypes.object,
  ref: PropTypes.object,
}
