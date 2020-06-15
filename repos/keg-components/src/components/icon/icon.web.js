import React from 'react'
import { IconWrapper } from './icon.wrapper'
import { FontAwesome } from '@expo/vector-icons'

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
    {...props}
    Element={props.Element || FontAwesome}
    isWeb={true}
  />
)

Icon.propTypes = {
  ...IconWrapper.propTypes,
}
