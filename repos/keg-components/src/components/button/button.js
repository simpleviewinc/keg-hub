import React from 'react'
import { ButtonWrapper } from './button.wrapper'
import { getPlatform } from 'KegGetPlatform'
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native'
import { useClassName } from '../../hooks/useClassName'

const isWeb = getPlatform() === 'web'
const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

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
const Element = React.forwardRef(({ className, dataSet,  ...props}, ref) => {
  const btnRef = useClassName(className, dataSet, ref)

  return (
    <Touchable
      {...props}
      ref={btnRef}
    />
  )
})

export const Button = props => (
  <ButtonWrapper
    {...props}
    Element={Element}
    isWeb={isWeb}
  />
)

Button.propTypes = { ...Touchable.propTypes, ...ButtonWrapper.propTypes }
