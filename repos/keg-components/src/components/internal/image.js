import React from 'react'
import PropTypes from 'prop-types'
import { useClassName } from 'KegClassName'
import { Image as RNImage } from 'react-native'

/**
 * Image
 * @summary Wrapper around the React Native Image export. Allows setting the className
 *
 * @param {Object} props - see View PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const Image = React.forwardRef(({ className, ...props }, ref) => {
  const classRef = useClassName('keg-image', className, ref)
  return <RNImage
    accessibilityLabel='image'
    {...props}
    ref={classRef}
  />
})

Image.propTypes = {
  ...RNImage.propTypes,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
}
