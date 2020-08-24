import React from 'react'
import { IconWrapper } from './icon.wrapper'
import { getPlatform } from 'KegGetPlatform'
const isWeb = getPlatform() === 'web'

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
 * @property {String} props.Element - the icon set component to use
 */
export const Icon = props => <IconWrapper
  {...props}
  Element={props.Element}
  isWeb={isWeb}
/>

Icon.propTypes = {
  ...IconWrapper.propTypes,
}
