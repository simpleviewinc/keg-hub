import React from 'react'
import { Image as RNImage } from 'react-native'

/**
 * Image
 * @summary Wrapper around the React Native Image export. Extracts the className from the props
 *
 * @param {Object} props - see View PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const Image = React.forwardRef(({ className, ...props }, ref) => {
  return <RNImage
    accessibilityLabel='image'
    {...props}
    ref={ref}
  />
})

Image.propTypes = RNImage.propTypes
