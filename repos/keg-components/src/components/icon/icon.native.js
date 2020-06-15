import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { IconWrapper } from './icon.wrapper'

/**
 * Icon
 * @summary Custom Icon component
 *
 * @param {Object} props - see Icon.propTypes
 * @property {string} props.color - color of Icon
 * @property {string} props.name - Name of Icon
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
  />
)

Icon.propTypes = {
  ...IconWrapper.propTypes,
}
