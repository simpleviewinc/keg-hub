import React from 'react'
import { Image } from 'react-native'
import { useTheme } from 're-theme'
import { get, isStr } from 'jsutils'
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

  const { src, style, type, ref, onPress, onClick, ...attrs } = props

  const theme = useTheme()
  const imgStyle = get(theme, [ 'components', 'image', type || 'default' ])
  const source = isStr(src) ? { uri: src } : src
  
  return (
    <Image
      { ...attrs }
      ref={ ref }
      source={ source }
      style={ theme.join(imgStyle, style) }
      onPress={ onClick || onPress }
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
