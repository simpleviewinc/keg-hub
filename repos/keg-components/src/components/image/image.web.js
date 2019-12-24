import React from 'react'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

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
export const Image = props => {

  const { alt, onPress, ref, src, style, type } = props

  const theme = useTheme()
  const imgStyle = get(theme, [ 'components', 'image', type || 'default' ])

  return (
    <img
      ref={ ref }
      src={ src }
      alt={ alt }
      style={ theme.join(style, imgStyle) }
      onClick={ onPress }
    />
  )

}

Image.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: [ PropTypes.string, PropTypes.object ],
  style: PropTypes.object,
  ref: PropTypes.object,
}