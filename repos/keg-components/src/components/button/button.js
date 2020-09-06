import React from 'react'
import { ButtonWrapper } from './button.wrapper'
import { Touchable } from '../touchable'
import { getPlatform } from 'KegGetPlatform'
import { useClassName } from '../../hooks/useClassName'
const isWeb = getPlatform() === 'web'

/**
 * Button
 * @summary Custom button component. All props are optional
 *
 * @param {Object} props - see buttonPropTypes
 * @property {String} props.text - button text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {Object} props.style - custom style
 * @property {Function} props.onPress - function to do when button is pressed
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} props.ref - reference to native element
 *
 */
export const Button = props => (
  <ButtonWrapper
    {...props}
    Element={Touchable}
    isWeb={isWeb}
  />
)

Button.propTypes = { ...Touchable.propTypes, ...ButtonWrapper.propTypes }
