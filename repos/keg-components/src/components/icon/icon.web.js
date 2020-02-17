import React from 'react'
import PropTypes from 'prop-types'
import { IconWrapper } from './icon.wrapper'
import { generateFontStyles } from '../../utils'
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf'

// Adds the required css for font-awesome fonts
// iconFont === path to the font file ( font-awesome.ttf )
generateFontStyles('FontAwesome', iconFont)

/**
 * Icon
 * @summary Custom image component. All props are optional
 *
 * @param {Object} props - see Icon.propTypes
 * @property {string} props.name - Name of Icon to load
 * @property {Object} props.ref - reference to native element
 * @property {String} props.size - Size of the icon ( if undefined, ( theme || style).fontSize is used )
 * @property {Object} props.style - custom style
 * @property {string} props.type - Icon type
 *
 */
export const Icon = props => (
  <IconWrapper
    { ...props }
    isWeb={ true }
  />
)

Icon.propTypes = {
  ...IconWrapper.propTypes
}