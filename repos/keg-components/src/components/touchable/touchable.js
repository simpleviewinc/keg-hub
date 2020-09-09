import React from 'react'
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native'
import { useClassName } from '../../hooks/useClassName'

const TouchableComp =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

/**
 * Touchable
 * @summary Custom Touch component. All props are optional
 *
 * @param {Object} props - see touchablePropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {Object} props.style - custom style - Set inline with the style prop
 * @property {Function} props.onPress - function to do when button is pressed
 * @property {Object} props.children - Child components of the component
 * @property {Object} props.ref - reference to native element
 *
 */
export const Touchable = React.forwardRef((props, ref) => {
  const { className, showFeedback = true, ...attrs } = props
  const Component = showFeedback ? TouchableComp : TouchableWithoutFeedback

  const touchRef = useClassName('keg-touchable', className, ref)

  return <Component
    accessible={true}
    {...attrs}
    ref={touchRef}
  />
})
